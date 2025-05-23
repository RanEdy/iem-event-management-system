import React, { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { IEventSection } from "@/entities/IEventSection";
import { ISectionFile } from "@/entities/ISectionFile";
import { EventStatus } from "@prisma/client";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import statesAndCities from "@/services/US-states-and-cities-json-master/data.json";

type EditEventFormProps = {
  eventId: number;
  onSave?: () => void
};

export const EditEventForm: React.FC<EditEventFormProps> = ({ eventId, onSave }) => {
  // Event basic info
  const [event, setEvent] = useState<IEvent | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [stateVal, setStateVal] = useState<string>("California");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [publicEvent, setPublicEvent] = useState<boolean>(false);
  const [maxUsers, setMaxUsers] = useState<number>(1);

  // Sections with files
  type SectionWithFiles = IEventSection & { 
    files: ISectionFile[];
    newFiles?: File[]; // Nuevos archivos a subir
  };
  const [sections, setSections] = useState<SectionWithFiles[]>([]);

  // Error / success
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load event, sections and files
  useEffect(() => {
    async function fetchData() {
      try {
        const evRes = await fetch(`/api/event/${eventId}`);
        const evJson: IEvent = await evRes.json();
        console.log(evJson)
        setEvent(evJson);
        setName(evJson.name);
        setAddress(evJson.address);
        setStateVal(evJson.state);
        setCity(evJson.city);
        setZipCode(evJson.zipCode);
        setStartDate(new Date(evJson.startDate));
        setEndDate(new Date(evJson.endDate));
        setPublicEvent(evJson.public);
        setMaxUsers(evJson.maxUsers);

        // fetch sections
        const secRes = await fetch(`/api/eventSection/findByEvent?id=${eventId}`);
        const secJson = await secRes.json();
        const secs: SectionWithFiles[] = await Promise.all(
          secJson.map(async (sec: IEventSection) => {
            const fileRes = await fetch(`/api/sectionFile/findBySection?id=${sec.id}`);
            const fileJson = await fileRes.json();
            console.log({ ...sec, files: fileJson });
            return { ...sec, files: fileJson, newFiles: [] };
          })
        );
        setSections(secs);
      } catch (err) {
        console.error(err);
        setError("Failed to load event data.");
      }
    }
    fetchData();
  }, [eventId]);

  // Section handlers
  const addSection = () => {
    const newSection: SectionWithFiles = {
      id: 0,
      eventId,
      sectionName: "New Section",
      description: "",
      files: [],
      newFiles: []
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (index: number, data: Partial<SectionWithFiles>) => {
    setSections(prev => prev.map((s, i) => i === index ? { ...s, ...data } : s));
  };

  const removeSection = async (sec: SectionWithFiles) => {
    if (sec.id) {
      await fetch(`/api/eventSection/${sec.id}`, { method: 'DELETE' });
    }
    setSections(prev => prev.filter(s => s !== sec));
  };

  // File handlers
  const removeFile = async (sectionIndex: number, file: ISectionFile) => {
    if (file.id) {
      await fetch(`/api/sectionFile/${file.id}`, { method: 'DELETE' });
    }
    setSections(prev => prev.map((s, i) => i === sectionIndex ? { ...s, files: s.files.filter(f => f !== file) } : s));
  };

  // Función helper para convertir File a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remover el prefijo "data:mime/type;base64,"
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Save edits
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Update event
      const evBody = { 
        name, 
        address, 
        state: stateVal, 
        city, 
        zipCode, 
        startDate, 
        endDate, 
        public: publicEvent, 
        status: event?.status ?? EventStatus.IN_PROCESS, 
        maxUsers 
      };
      await fetch(`/api/event/${eventId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(evBody) 
      });

      // Upsert sections
      await Promise.all(sections.map(async sec => {
        const { files, newFiles, ...secData } = sec;

        // Upsert section
        if (sec.id && sec.id > 0) {
          await fetch(`/api/eventSection/${sec.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secData),
          });
        } else {
          const res = await fetch('/api/eventSection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secData),
          });
          const json = await res.json();
          sec.id = json.section.id;
        }

        // Upload new files
        if (newFiles && newFiles.length > 0) {
          await Promise.all(newFiles.map(async file => {
            try {
              // Convertir el archivo a base64
              const base64Data = await fileToBase64(file);
              
              // Crear el objeto ISectionFile
              const fileData: Omit<ISectionFile, 'id'> = {
                sectionId: sec.id,
                name: file.name,
                dataBytes: Buffer.from(base64Data, 'base64')
              };

              // Enviar al endpoint como JSON
              const response = await fetch('/api/sectionFile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fileData),
              });

              if (!response.ok) {
                throw new Error(`Failed to upload file: ${file.name}`);
              }

              console.log(`File uploaded successfully: ${file.name}`);
            } catch (error) {
              console.error(`Error uploading file ${file.name}:`, error);
              throw error;
            }
          }));
        }
      }));

      setSuccess(true);
      onSave?.();
      
      // Reload data to show the newly uploaded files
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error(err);
      setError('Save failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-4 p-3 border border-red-300 rounded">{error}</div>}
      {success && <div className="text-green-500 mb-4 p-3 border border-green-300 rounded">Saved successfully!</div>}
      
      <form onSubmit={handleSave}>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Event Name" 
          required 
          className="border p-2 mb-4 w-full" 
          disabled={isLoading}
        />
        
        {/* Address / state / city / zip similar to EventForm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            value={address} 
            onChange={e => setAddress(e.target.value)} 
            placeholder="Address" 
            required 
            className="border p-2" 
            disabled={isLoading}
          />
          <select 
            value={stateVal} 
            onChange={e => setStateVal(e.target.value)} 
            required 
            className="border p-2"
            disabled={isLoading}
          >
            {Object.keys(statesAndCities).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            value={city} 
            onChange={e => setCity(e.target.value)} 
            placeholder="City" 
            required 
            className="border p-2" 
            disabled={isLoading}
          />
          <input 
            type="text" 
            value={zipCode} 
            onChange={e => setZipCode(e.target.value)} 
            placeholder="Zip Code" 
            required 
            className="border p-2" 
            disabled={isLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <DatePicker 
            selected={startDate} 
            onChange={d => d && setStartDate(d)} 
            showTimeSelect 
            dateFormat="MMMM, dd, yyyy hh:mm aa" 
            className="border p-2 w-full" 
            disabled={isLoading}
          />
          <DatePicker 
            selected={endDate} 
            onChange={d => d && setEndDate(d)} 
            showTimeSelect 
            dateFormat="MMMM, dd, yyyy hh:mm aa" 
            className="border p-2 w-full" 
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center gap-4 mt-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={publicEvent}
              onChange={e => setPublicEvent(e.target.checked)}
              disabled={isLoading}
              className="mr-2"
            />
            Public Event
          </label>
          
          <div className="flex items-center gap-2">
            <label htmlFor="maxUsers">Max Users:</label>
            <input
              id="maxUsers"
              type="number"
              min="1"
              value={maxUsers}
              onChange={e => setMaxUsers(parseInt(e.target.value))}
              disabled={isLoading}
              className="border p-1 w-20"
            />
          </div>
        </div>
        
        {/* Sections and files editor */}
        <EventDescription
          event={event}
          sections={sections}
          setSections={setSections}
          onAddSection={addSection}
          onRemoveSection={(idx) => removeSection(sections[idx])}
          onRemoveFile={(sectionIdx, fileIdx) => {
            const file = sections[sectionIdx].files[fileIdx];
            removeFile(sectionIdx, file);
          }}
          onAddFile={async (sectionIdx, file) => {
            // Add file to the list
            const updatedSections = [...sections];
            if (!updatedSections[sectionIdx].newFiles) {
              updatedSections[sectionIdx].newFiles = [];
            }
            updatedSections[sectionIdx].newFiles!.push(file);
            setSections(updatedSections);

            // Return a temporal object for UI purpose
            const buffer = await file.arrayBuffer();
            return {
              id: 0, // Temporal ID
              sectionId: sections[sectionIdx].id,
              name: file.name,
              dataBytes: Buffer.from(buffer),
            };
          }}
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={`mt-6 px-6 py-2 rounded text-white ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update Event'}
        </button>
      </form>
    </div>
  );
};
