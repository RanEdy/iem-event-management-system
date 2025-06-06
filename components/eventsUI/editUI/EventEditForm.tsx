"use client";

import { useEffect, useRef, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus } from "@prisma/client";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { IEventSection } from "@/entities/IEventSection";
import { EventEditDescription } from "./EventEditDescription";
import { ISectionFile } from "@/entities/ISectionFile";
import statesAndCities from "@/services/US-states-and-cities-json-master/data.json";

type EventEditFormProps = {
  title: string;
  eventId: number;
  onSave: () => void;
}

export type EditableFile = ISectionFile & { file?: File; isNew?: boolean };

export const EventEditForm: React.FC<EventEditFormProps> = ({ title, eventId, onSave }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("California");
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [citySearchTerm, setCitySearchTerm] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [publicEvent, setPublicEvent] = useState<boolean>(false);
  const [maxUsers, setMaxUsers] = useState<number>(1);

  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  const [event, setEvent] = useState<IEvent>({
    id: eventId,
    name: "",
    state: "California",
    city: "",
    zipCode: "",
    address: "",
    startDate: new Date(),
    endDate: new Date(),
    public: false,
    maxUsers: 1,
    status: EventStatus.IN_PROCESS
  });

  const [sections, setSections] = useState<(IEventSection & { files: EditableFile[] })[]>([]);
  const [deletedSections, setDeletedSections] = useState<number[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

  // Load event data
  useEffect(() => {
    const loadEventData = async () => {
      try {
        setLoading(true);

        // Load event details
        const eventResponse = await fetch(`/api/event/${eventId}`);
        const eventData = await eventResponse.json();

        if (eventData) {
          setEvent(eventData);
          setName(eventData.name);
          setCity(eventData.city);
          setState(eventData.state);
          setZipCode(eventData.zipCode);
          setAddress(eventData.address);
          setStartDate(new Date(eventData.startDate));
          setEndDate(new Date(eventData.endDate));
          setPublicEvent(eventData.public);
          setMaxUsers(eventData.maxUsers);
          setCitySearchTerm(eventData.city);
        }

        // Load sections
        const sectionsResponse = await fetch(`/api/eventSection/findByEvent?id=${eventId}`);
        const sectionsData = await sectionsResponse.json();

        if (sectionsData && Array.isArray(sectionsData)) {
          // Load files for each section
          const sectionsWithFiles = await Promise.all(
            sectionsData.map(async (section: IEventSection) => {
              const filesResponse = await fetch(`/api/sectionFile/findBySection?id=${section.id}`);
              const filesData = await filesResponse.json();

              const files: EditableFile[] = Array.isArray(filesData)
                ? filesData.map((file: ISectionFile) => ({ ...file, isNew: false }))
                : [];

              return { ...section, files };
            })
          );

          setSections(sectionsWithFiles);
        } else {
          // If no sections exist, create a default one
          setSections([{
            id: Date.now(), // temporal ID for new sections
            eventId: eventId,
            sectionName: "Section 1",
            description: "",
            files: [],
          }]);
        }
      } catch (error) {
        console.error('Error loading event data:', error);
        setErrorMessage('Failed to load event data');
        setErrorDialogOpen(true);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadEventData();
    }
  }, [eventId]);

  // Update available cities
  useEffect(() => {
    if (state && statesAndCities[state as keyof typeof statesAndCities]) {
      const cities = statesAndCities[state as keyof typeof statesAndCities] as string[];
      setAvailableCities(cities);
      setFilteredCities(cities);
      if (city && !cities.includes(city)) {
        setCity("");
        setCitySearchTerm("");
      }
    } else {
      setAvailableCities([]);
      setFilteredCities([]);
    }
  }, [state]);

  // Filter cities
  useEffect(() => {
    if (citySearchTerm) {
      const filtered = availableCities.filter(city =>
        city.toLowerCase().includes(citySearchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(availableCities);
    }
  }, [citySearchTerm, availableCities]);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setCitySearchTerm(selectedCity);
    setShowCityDropdown(false);
  };

  // Verify ZIP and city before validating the event
  async function validateZipCity() {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);

      if (!response.ok) {
        return { status: "error", message: `Invalid ZIP code ${zipCode}.` };
      }

      const data = await response.json();
      if (!data.places || data.places.length === 0) {
        return { status: "error", message: `No information found for ZIP code: ${zipCode}.` };
      }

      const foundCity = data.places[0]["place name"];
      const foundState = data.places[0]["state"];
      const foundStateAbbreviation = data.places[0]["state abbreviation"];

      if (foundCity.toLowerCase() !== city.toLowerCase()) {
        return { status: "error", message: `ZIP code ${zipCode} does not match the city ${city}. It actually belongs to  ${foundCity}, ${foundState} (${foundStateAbbreviation}).` }; 
      }

      if (foundState.toLowerCase() !== state.toLowerCase()) {
        return { status: "error", message: `ZIP code ${zipCode} does not belong to the state ${state}. It actually belongs to ${foundState}.` };
      }

      return { status: "success", message: "Validation successful." };

    } catch (error) {
      return { status: "error", message: `Error validating ZIP code.` };
    }
  }

  const updateEvent = async (): Promise<any | null> => {
    try {

      // Verify ZIP and city before validating the event
      const validationResultZipCode = await validateZipCity();
      if (validationResultZipCode.status === "error") {
        setErrorMessage(validationResultZipCode.message); 
        setErrorDialogOpen(true);
        return null;
      }

      // Validate data before sending
      const validation = await fetch('/api/event/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          city,
          state,
          zipCode,
          address,
          startDate,
          endDate,
          maxUsers
        }),
      });

      const validationResult = await validation.json();

      if (!validationResult.success) {
        setErrorMessage(validationResult.error);
        setErrorDialogOpen(true);
        return null;
      }

      // Update event
      const eventToUpdate = {
        name,
        city,
        state,
        zipCode,
        address,
        startDate,
        endDate,
        public: publicEvent,
        maxUsers,
      };

      const responseUpdateEvent = await fetch(`/api/event/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventToUpdate),
      });

      const response = await responseUpdateEvent.json();
      return response;

    } catch (error) {
      console.error('Error updating event:', error);
      setErrorMessage('An unexpected error occurred while updating the event.');
      setErrorDialogOpen(true);
      return null;
    }
  };

  const updateSections = async (): Promise<boolean> => {
    try {
      // Delete removed sections
      for (const sectionId of deletedSections) {
        await fetch(`/api/eventSection/${sectionId}`, {
          method: 'DELETE',
        });
      }

      // Update/Create sections
      for (const section of sections) {
        const { files, ...sectionNoFiles } = section;

        if (section.id < 0 || section.id > 1000000) { // New section (temporal ID)
          const response = await fetch('/api/eventSection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...sectionNoFiles,
              eventId: eventId,
              id: undefined
            }),
          });

          const result = await response.json();
          if (result.success) {
            section.id = result.section.id; // Update with real ID
          }
        } else {
          // Update existing section
          await fetch(`/api/eventSection/${section.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sectionNoFiles),
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating sections:', error);
      return false;
    }
  };

  const updateFiles = async (): Promise<boolean> => {
    try {
      // Delete removed files
      for (const fileId of deletedFiles) {
        await fetch(`/api/sectionFile/${fileId}`, {
          method: 'DELETE',
        });
      }

      // Process files for each section
      for (const section of sections) {
        for (const file of section.files) {
          if (file.isNew && file.file) {
            // Upload new file
            const formData = new FormData();
            formData.append('file', file.file);

            const uploadRes = await fetch('/api/sectionFile/upload', {
              method: 'POST',
              body: formData,
            });

            const uploadJson = await uploadRes.json();
            if (!uploadJson.success) {
              throw new Error("Failed to upload file");
            }

            // Save file to database
            const newFile: Omit<ISectionFile, 'id'> = {
              sectionId: section.id,
              name: uploadJson.name,
              url: uploadJson.url
            };

            const responseFile = await fetch('/api/sectionFile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newFile),
            });

            const resp = await responseFile.json();
            if (!resp.success) {
              throw new Error("Failed to create file");
            }
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating files:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventUpdated = await updateEvent();
      if (eventUpdated) {
        const sectionsSuccess = await updateSections();
        if (sectionsSuccess) {
          const filesSuccess = await updateFiles();
          if (filesSuccess) {
            setSuccessDialogOpen(true);
          } else {
            throw new Error("Error updating files.");
          }
        } else {
          throw new Error("Error updating sections.");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
      setErrorMessage("An unexpected error occurred while updating the event.");
      setErrorDialogOpen(true);
    }
  };

  const handleRemoveSection = async (sectionIndex: number): Promise<void> => {
    const section = sections[sectionIndex];
    if (section.id > 0 && section.id < 1000000) { // Existing section
      setDeletedSections(prev => [...prev, section.id]);
    }

    const updated = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updated);
  };

  const handleRemoveFile = (sectionIndex: number, fileIndex: number) => {
    const file = sections[sectionIndex].files[fileIndex];
    if (!file.isNew && file.id) {
      setDeletedFiles(prev => [...prev, file.id]);
    }

    const updated = [...sections];
    updated[sectionIndex].files = updated[sectionIndex].files.filter((_, idx) => idx !== fileIndex);
    setSections(updated);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading event data...</div>
      </div>
    );
  }

  return (
    <div className="p-1 my-4 h-full w-full">
      {/* FORM */}
      <div className="justify-between">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Event Name*"
            className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
            title="Event Name*"
          />

          {/* FIRST ROW: STREET */}
          <div className="grid grid-cols-1 gap-4 mt-6 mb-6">
            <input
              type="text"
              id="street"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address*"
              className="border-2 border-gray-300 w-full p-2 rounded-md"
              title="Street*"
            />
          </div>

          {/* SECOND ROW: STATE, CITY AND ZIP CODE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 mb-6">
            <select
              id="state"
              value={state ?? ""}
              required
              onChange={(e) => setState(e.target.value)}
              className="border-2 border-gray-300 w-full p-2 rounded-md"
              title="State*"
            >
              <option value="">State</option>
              {Object.keys(statesAndCities).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>

            {/* CITY */}
            <div className="relative">
              <input
                type="text"
                id="city"
                value={citySearchTerm}
                required
                onChange={(e) => {
                  setCitySearchTerm(e.target.value);
                  setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                placeholder="City*"
                className="border-2 border-gray-300 w-full p-2 rounded-md"
                title="City*"
              />
              {showCityDropdown && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredCities.map((cityName, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCitySelect(cityName)}
                    >
                      {cityName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              id="zipCode"
              value={zipCode}
              required
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip Code*"
              className="border-2 border-gray-300 w-full p-2 rounded-md"
              title="Zip Code*"
            />
          </div>

          {/* DATE TABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  mt-4">

            {/* FIRST CELL: START DATE */}
            <div className="grid grid-rows-2">
              <label className="text-lg font-bold text-center">
                Start date
                <hr className="border-t-2 border-gray-300 mt-2" />
              </label>
              <DatePicker
                className="w-full p-2 border-2 border-gray-300 rounded-md"
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setStartDate(date)
                  } else {
                    setStartDate(new Date())
                  }
                }}
                showTimeSelect
                dateFormat="MMMM, dd,  yyyy hh:mm aa"
                placeholderText="Start Date*"
              />
            </div>

            {/* SECOND CELL: END DATE */}
            <div className="grid grid-rows-2">
              <label className="text-lg font-bold text-center">
                End date
                <hr className="border-t-2 border-gray-300 mt-2" />
              </label>
              <DatePicker
                className="w-full p-2 border-2 border-gray-300 rounded-md"
                selected={endDate}
                onChange={(date) => {
                  if (date) {
                    setEndDate(date)
                  } else {
                    setEndDate(new Date())
                  }
                }}
                showTimeSelect
                dateFormat="MMMM, dd, yyyy hh:mm aa"
                placeholderText="End Date*"
              />
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 mt-6" />

          {/* MAX USERS AND PUBLIC/PRIVATE BUTTON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  mt-4">

            {/* FIRST CELL: MAX USERS */}
            <div className="grid grid-rows-2">
              <label className="text-lg font-bold text-center">
                Max Users
                <hr className="border-t-2 border-gray-300 mt-2" />
              </label>
              <input
                type="number"
                id="maxUsers"
                value={maxUsers ?? ""}
                required
                onChange={(e) => setMaxUsers(Number(e.target.value))}
                placeholder="Max Users*"
                min={1}
                max={1000}
                className="grid border-2 border-gray-300 grid-rows-1 p-2 placeholder-gray-400 rounded-md"
                title="Max Users*"
              />
            </div>

            {/* SECOND CELL: PUBLIC/PRIVATE BUTTON */}
            <div className="grid grid-rows-2">
              <div></div>
              <label className="flex items-center cursor-pointer">
                {/* SWITCH TEXT */}
                <span className="ml-3 font-bold p-3">{publicEvent ? "Public" : "Private"}</span>
                {/* HIDDEN INPUT */}
                <input
                  type="checkbox"
                  checked={publicEvent}
                  onChange={() => setPublicEvent(!publicEvent)}
                  className="hidden"
                />
                {/* SWITCH BUTTON STYLE */}
                <div className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${publicEvent ? 'bg-green-500' : 'bg-red-500'}`}>
                  {/* CIRCLE ANIMATION */}
                  <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${publicEvent ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </label>
            </div>
          </div>

          {/* DESCRIPTION SECTION */}
          <EventEditDescription
            event={event}
            sections={sections}
            setSections={setSections}
            onRemoveSection={handleRemoveSection}
            onRemoveFile={handleRemoveFile}
          />

          {/* BUTTONS */}
          <button
            type="submit"
            className="h-10 w-full p-2 sm:w-1/3 mt-6 rounded-md bg-bluedark-gradient-r hover:opacity-75 text-white font-bold">
            Update Event
          </button>
        </form>
      </div>

      {/* SUCCESS DIALOG */}
      {successDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" bg-white rounded-md p-6 shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Success</h3>
            <p className="text-gray-700">Event successfully updated</p>

            <button
              type="button"
              className="mt-4 px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
              onClick={() => {
                setSuccessDialogOpen(false);
                if (onSave) {
                  onSave();
                }
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* ERROR DIALOG */}
      {errorDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-3">Error updating event</h2>
            <p className="text-gray-700 mb-5 text-center">{errorMessage}</p>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-red-500 text-white font-bold px-20 py-2 rounded-md hover:bg-red-600"
                onClick={() => setErrorDialogOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};