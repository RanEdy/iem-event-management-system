import React, { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { IEventSection } from "@/entities/IEventSection";
import { ISectionFile } from "@/entities/ISectionFile";
import { EventStatus } from "@prisma/client";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import statesAndCities from "@/services/US-states-and-cities-json-master/data.json";
import { EventDescription } from "./EventDescription";

type EditEventFormProps = {
  title: string;
  eventId: number;
};

export const EditEventForm: React.FC<EditEventFormProps> = ({ title, eventId }) => {
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
  type SectionWithFiles = IEventSection & { files: ISectionFile[] };
  const [sections, setSections] = useState<SectionWithFiles[]>([]);

  // Error / success
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

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
        const secRes = await fetch(`/api/eventSection?eventId=${eventId}`);
        const secJson = await secRes.json();
        console.log(secJson);
        const secs: SectionWithFiles[] = await Promise.all(
          secJson.map(async (sec: IEventSection) => {
            const fileRes = await fetch(`/api/sectionFile?sectionId=${sec.id}`);
            const fileJson = await fileRes.json();
            return { ...sec, files: fileJson.files };
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
      files: []
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

  // Save edits
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update event
      const evBody = { name, address, state: stateVal, city, zipCode, startDate, endDate, public: publicEvent, status: event?.status ?? EventStatus.IN_PROCESS, maxUsers };
      await fetch(`/api/event/${eventId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(evBody) });

      // Upsert sections
      await Promise.all(sections.map(async sec => {
        const { files, ...secData } = sec;
        if (sec.id) {
          await fetch(`/api/eventSection/${sec.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(secData) });
        } else {
          const res = await fetch('/api/eventSection', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(secData) });
          const json = await res.json();
          sec.id = json.section.id;
        }
        // Upsert files if needed (omitted here - handle via EventDescription component)
      }));

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Save failed.');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Saved successfully!</p>}
      <form onSubmit={handleSave}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Event Name" required className="border p-2 mb-4 w-full" />
        {/* Address / state / city / zip similar to EventForm */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required className="border p-2" />
          <select value={stateVal} onChange={e => setStateVal(e.target.value)} required className="border p-2">
            {Object.keys(statesAndCities).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" required className="border p-2" />
          <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="Zip Code" required className="border p-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <DatePicker selected={startDate} onChange={d => d && setStartDate(d)} showTimeSelect dateFormat="MMMM, dd, yyyy hh:mm aa" className="border p-2" />
          <DatePicker selected={endDate} onChange={d => d && setEndDate(d)} showTimeSelect dateFormat="MMMM, dd, yyyy hh:mm aa" className="border p-2" />
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
        />
        <button type="submit" className="mt-6 bg-blue-600 text-white p-2 rounded">Update Event</button>
      </form>
    </div>
  );
};
