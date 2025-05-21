"use client";

import { useEffect, useRef, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus } from "@prisma/client";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { IEventSection } from "@/entities/IEventSection";
import { EventDescription } from "./EventDescription";
import { ISectionFile } from "@/entities/ISectionFile";
import statesAndCities from "@/services/US-states-and-cities-json-master/data.json";

type EventFormProps = {
  title: string;
  eventId?: number; //If this component will be use to modified an event
  onSave: () => void
}

export const EventForm: React.FC<EventFormProps> = ({ title, eventId, onSave }) => {

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
  const [succesDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  // IMPORTANT: If you want to create a new Event with new Sections
  // First Create the event, then get the id >> then replace that id in the sections >> then create the sections
  // >> then get the id from every section >> then replace every id of the section in the files for each section 
  // >> then create each file
  const [event, setEvent] = useState<IEvent>({
    id: 0,
    name: "Event",
    state: "California",
    city: "Indio",
    zipCode: "31222",
    address: "Address",
    startDate: new Date(),
    endDate: new Date(),
    public: false,
    maxUsers: 1,
    status: EventStatus.IN_PROCESS
  }) //default value for event (this will get replaced with the new info)
  // State for grouping Sections + Files
  const [sections, setSections] = useState<(IEventSection & { files: ISectionFile[] })[]>
    (
      [
        //Default value for the first section when creating a new event
        {
          id: 1, //auto generated
          eventId: 0, //replace this
          sectionName: "Section 1",
          description: "",
          files: [],
        },
      ]
    );

  // Actualizar ciudades disponibles cuando cambia el estado
  useEffect(() => {
    if (state && statesAndCities[state as keyof typeof statesAndCities]) {
      const cities = statesAndCities[state as keyof typeof statesAndCities] as string[];
      setAvailableCities(cities);
      setFilteredCities(cities);
      // Limpiar la ciudad seleccionada si no está en la lista de ciudades del nuevo estado
      if (city && !cities.includes(city)) {
        setCity("");
      }
    } else {
      setAvailableCities([]);
      setFilteredCities([]);
    }
  }, [state]);

  // Filtrar ciudades basado en el término de búsqueda
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

  // Manejar la selección de ciudad
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setCitySearchTerm(selectedCity);
    setShowCityDropdown(false);
  };

  //Returns the json response or null
  const createEvent = async (): Promise<any | null> => {
    try {
      // We valite the data before sending to the data base
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

      // Validation response
      const validationResult = await validation.json();

      if (!validationResult.success) {
        setErrorMessage(validationResult.error);
        setErrorDialogOpen(true);
        return null;
      }

      // Fill the event object
      const eventToSend = {
        name,
        city,
        state,
        zipCode,
        address,
        startDate,
        endDate,
        public: publicEvent,
        status: EventStatus.IN_PROCESS,
        maxUsers,
      };

      console.log("Creating event: ", eventToSend);
      // We almost have all the information to create the event, now we send it to the database
      const responseCreateEvent = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventToSend),
      });

      const response = await responseCreateEvent.json();

      // Now return the event with the successfully status
      return response;

    } catch (error) {
      console.error('An error ocurred:', error);
      setErrorMessage('An unexpected error occurred while creating the event.');
      setErrorDialogOpen(true);
      return null;
    }
  };

  //Returns the success array
  const createSections = async (eventId: number): Promise<any[]> => {
    console.log("Updating sections id...");
    const updatedSections = sections.map(section => {
      section.eventId = eventId;
      console.log(section);
      return section;
    });
    setSections(updatedSections);

    // Create sections
    console.log("Creating updated sections...");
    const sectionResponses = await Promise.all(
      updatedSections.map(async (section) => {
        const { files, ...sectionNoFiles } = section;
        console.log(sectionNoFiles);

        const responseCreateEventSection = await fetch('/api/eventSection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sectionNoFiles),
        });

        console.log("Response");
        const resp = await responseCreateEventSection.json();
        console.log(resp);

        if (resp.success) {
          const updatedSection: IEventSection = resp.section;
          section.id = updatedSection.id;
        } else {
          console.log("Error: Failed to create the section: ");
          console.log(sectionNoFiles);
        }

        return resp.success;
      })
    );

    return sectionResponses;
  }

  const createFiles = async (): Promise<boolean> => {
    try {
      await Promise.all(
        sections.map(async (currentSection, i) => {
          console.log("Section #" + i + ":\n", currentSection);

          await Promise.all(
            currentSection.files.map(async (file, j) => {
              const newFile: Omit<ISectionFile, 'id'> = {
                sectionId: currentSection.id,
                name: file.name,
                url: file.url
              }

              const responseFile = await fetch('/api/sectionFile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFile),
              });

              const resp = await responseFile.json();
              console.log("File #" + j + ":\n", resp.file);
              if (!resp.success) {
                console.log("Error: trying to create a file");
                console.log(resp);
                throw new Error("Failed to create file");
              }
            })
          );
        })
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const handleEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventCreated = await createEvent();
      if (eventCreated !== null && eventCreated.success) {
        console.log("Event Created:", eventCreated)
        if (eventCreated.event && eventCreated.event.id) {
          const sectionResponses = await createSections(eventCreated.event.id);
          const isSectionCreationSuccess = sectionResponses.every((success) => success);

          if (isSectionCreationSuccess) {
            console.log("Files creation for each section...");
            const isFileCreationSuccess = await createFiles();

            if (isFileCreationSuccess) {
              setSuccessDialogOpen(true);
            } else {
              throw new Error("Error creating files.");
            }
          } else {
            throw new Error("Error creating sections.");
          }
        } else {
          throw new Error("Invalid event ID.");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
      setErrorMessage("An unexpected error occurred while creating the event.");
      setErrorDialogOpen(true);
    }
  };

  const handleAddFile = async (sectionIndex: number, file: File): Promise<ISectionFile> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/sectionFile/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");

    return {
      id: 0, // temporal
      sectionId: sections[sectionIndex].id,
      name: data.name,
      url: data.url
    };
  };

  const cleanForm = () => {
    setName('');
    setCity('');
    setState("California");
    setZipCode('');
    setAddress('');
    setStartDate(new Date());
    setEndDate(new Date());
    setPublicEvent(false);
    setMaxUsers(1);
    setCitySearchTerm('');
    setSections([
      {
        id: 1,
        eventId: 0,
        sectionName: "Section 1",
        description: "",
        files: [],
      }
    ]);
  };

  return (
    <div className="p-1 my-4 h-full w-full overflow-visible overflow-y-scroll">
      {/* HEADER TITLE */}
      <div className="mb-5 justify-self-center">
        <div className="text-cyan-900 text-center text-3xl lg:text-5xl font-extrabold font-maven">
          {title}
        </div>
      </div>
      <hr className="w-[100%] border-t-4 border-cyan-900 " />

      {/* FORM */}
      <div className="justify-between">
        <form onSubmit={handleEvent}>
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
                Start date*
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
                End date*
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
                Max Users*
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
                max={100000}
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
          <EventDescription event={event} sections={sections} setSections={setSections} onAddFile={handleAddFile} />
          {/* BUTTONS */}
          <button
            type="submit"
            className="h-10 w-full p-2 sm:w-1/3 mt-6 rounded-md bg-blue-900 text-white font-bold">
            Save
          </button>
        </form>
      </div>
      {/* ERROR DIALOG */}
      {/* DIALOG CONFIRMATION */}
      {succesDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Success</h2>
            <p className="text-gray-700 mb-5"><span className="font-bold">Event successfully created</span></p>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-green-500 text-white font-bold px-20 py-2 rounded-md hover:bg-green-600"
                onClick={() => {
                  setSuccessDialogOpen(false);
                  cleanForm();
                  // Call onSave before cleaning the form
                  if (onSave) {
                    onSave();
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* DIALOG ERROR */}
      {errorDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-3">This event can't be created</h2>
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
  )
}