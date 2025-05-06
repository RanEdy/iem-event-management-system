"use client";

import { useEffect, useRef, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus, USAState } from "@prisma/client";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { eventListTest } from "@/entities/tests/EventTests";
import { IEventSection } from "@/entities/IEventSection";
import { EventDescription } from "./EventDescription";
import { ISectionFile } from "@/entities/ISectionFile";

type EventFormProps = {
  title: string;
  eventId?: number; //If this component will be use to modified an event
  onSave: () => void
}

export const EventForm: React.FC<EventFormProps> = ({ title, eventId, onSave }) => {

  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<USAState>(USAState.CALIFORNIA);
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [publicEvent, setPublicEvent] = useState<boolean>(false);
  const [maxUsers, setMaxUsers] = useState<number>(1);

  // IMPORTANT: If you want to create a new Event with new Sections
  // First Create the event, then get the id >> then replace that id in the sections >> then create the sections
  // >> then get the id from every section >> then replace every id of the section in the files for each section 
  // >> then create each file
  const [event, setEvent] = useState<IEvent>(eventListTest[0]) //default value for event (this will get replaced with the new info)
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

  //Returns the json response or null
  const createEvent = async (): Promise<any | null> => {
    if (startDate && endDate && endDate < startDate) {
      alert("The end date cannot be earlier than the start date.");
      return null;
    }

    const eventToSend: Omit<IEvent, 'id'> = {
      name,
      state,
      city,
      zipCode,
      address,
      startDate,
      endDate,
      maxUsers,
      public: publicEvent,
      status: EventStatus.IN_PROCESS
    };

    console.log("Event\n:", eventToSend);


    // Create a new Event
    const responseCreateEvent = await fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventToSend),
    });

    // { success, event, message}
    const dataCreateEvent = await responseCreateEvent.json();
    console.log(dataCreateEvent);
    return dataCreateEvent;
  }

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
    await Promise.all(
      sections.map(async (currentSection, i) => {
        console.log("Section #" + i + ":\n", currentSection);

        await Promise.all(
          currentSection.files.map(async (file, j) => {
            const newFile: Omit<ISectionFile, 'id'> = {
              sectionId: currentSection.id,
              name: file.name,
              dataBytes: file.dataBytes
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
              return false
            }
          })
        );
      })
    );
    return true;
  }

  const handleEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //Create Event
      const eventCreated = await createEvent();
      if (eventCreated !== null && eventCreated.success) {
        //Create sections
        const sectionResponses = await createSections(eventCreated.event.id);
        const isSectionCreationSuccess = sectionResponses.every((success) => success);
        //Create Files
        if (isSectionCreationSuccess) {
          console.log("Files creation for each section...");
          // Create files for each section
          const isFileCreationSuccess = await createFiles()
          if (isFileCreationSuccess) onSave?.()
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }

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

          {/* SECOND ROW: STATE, CITY AND ZIP CODE  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 mb-6">
            <select
              id="state"
              value={state ?? ""}
              required
              onChange={(e) => setState(e.target.value as USAState)}
              className="border-2 border-gray-300 w-full p-2 rounded-md"
              title="State*"
            >
              <option value="">State</option>
              {Object.values(USAState).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <input
              type="text"
              id="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              placeholder="City*"
              className="border-2 border-gray-300 w-full p-2 rounded-md"
              title="City*"
            />

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
                max={10000}
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
          <EventDescription event={event} sections={sections} setSections={setSections} />
          {/* Save BUTTON */}
          <button
            type="submit"
            className="h-10 w-full p-2 sm:w-1/3 mt-6 rounded-md bg-blue-900 text-white font-bold">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}