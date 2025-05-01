"use client";

import { useEffect, useRef, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { USAState } from "@prisma/client";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { eventListTest } from "@/entities/tests/EventTests";
import { IEventSection } from "@/entities/IEventSection";
import { EventDescription } from "./EventDescription";
import { ISectionFile } from "@/entities/ISectionFile";

type EventFormProps = {
    title: string;
    eventId?: number; //If this component will be use to modified an event
}

export const EventForm: React.FC<EventFormProps> = ({title, eventId}) => {

    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<USAState>(USAState.CALIFORNIA);
    const [zipCode, setZipCode] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [internalNumber, setInternalNumber] = useState<number | null>(null);
    const [externalNumber, setExternalNumber] = useState<number | null>(null);

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
              event,
              files: [],
            },
        ]
      );

    const handleEvent = async (e: React.FormEvent) => {
        e.preventDefault();
 
        // VALIDATION: THE END DATE CANNOT BE PRIOR TO THE START DATE
        if (startDate && endDate && endDate < startDate) {
            alert("The end date cannot be earlier than the start date.");
            return; // ERROR
        }

        console.log("Event Name:", name);
        console.log("State:", state);
        console.log("City:", city);
        console.log("Zip Code:", zipCode);
        console.log("Street:", street);
        console.log("External Number:", externalNumber);
        console.log("Internal Number:", internalNumber);
        console.log("Start Date:", startDate?.toISOString().split("T")[0] ?? "Not set");
        console.log("End Date:", endDate?.toISOString().split("T")[0] ?? "Not set");
        console.log("Max Users:", maxUsers);
        console.log("Public Event:", publicEvent ? "Public" : "Private");

        setEvent({ id: 1, name: name, state: state,city: city, zipCode: zipCode, street: street, externalNumber: externalNumber,
                    internalNumber: internalNumber, startDate: startDate, endDate: endDate, maxUsers: maxUsers, public: publicEvent, done: false
         })

        try {

            // Create a new Event
            const responseCreateEvent = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event }),
            });

            //Get response from the api
            const dataCreateEvent: boolean = await responseCreateEvent.json();

            //Verification that the new event was created succesfully
            if (dataCreateEvent)
            {
                const responseObtainRecentEvent = await fetch('/api/event/obtainRecentEvent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const recentEvent: IEvent = await responseObtainRecentEvent.json();
    
                //Update all sections with the id from the new event created
                setSections(sections.map( section => {
                    section.eventId = recentEvent.id;
                    section.event = recentEvent; 
                    return section;
                }))

                //Create a new section for each one in the array
                sections.forEach(async (section) => {
                    const responseCreateEventSection = await fetch('/api/eventSection', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ section }),
                    });

                    const success: boolean  = await responseCreateEventSection.json();
                    if (success)
                    {
                        //Get the last section created
                        const responseFindRecent = await fetch('/api/eventSection/findRecent',
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                        //Update the id
                        const updatedSection: IEventSection = await responseFindRecent.json();
                        section.id = updatedSection.id
                    }
                })
    
                //Create the files for each section
                sections.forEach( async (section) => {
                    section.files.forEach( async (file) =>
                    {
                        file.sectionId = section.id
                        file.section = section
                        const responseFile = await fetch('/api/sectionFile',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type' : 'application/json',
                                },
                                body: JSON.stringify(file)
                            }
                        )
                        const success: boolean = await responseFile.json()
                        if (!success) console.log("Error: trying to create a file")
                    })
                })

            }
            

        } catch (error) {
            console.error("ERROR", error);
        }
        
        console.log()

    }


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

                    {/* FIRST ROW: STATE, CITY AND ZIP CODE */}
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

                    {/* SECOND ROW: STREET, EXTERNAL NUMBER, INTERNAL NUMBER */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 mb-6">
                        <input
                            type="text"
                            id="street"
                            value={street}
                            required
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Street*"
                            className="border-2 border-gray-300 w-full p-2 rounded-md"
                            title="Street*"
                        />

                        <input
                            type="number"
                            id="externalNumber"
                            value={externalNumber ?? ""}
                            onChange={(e) => setExternalNumber(Number(e.target.value))}
                            placeholder="External Number*"
                            className="border-2 border-gray-300 w-full p-2 rounded-md"
                            title="External Number*"
                            min={1}
                            max={10000}
                        />

                        <input
                            type="number"
                            id="internalNumber"
                            value={internalNumber ?? ""}
                            onChange={(e) => setInternalNumber(Number(e.target.value))}
                            placeholder="Internal Number"
                            className="border-2 border-gray-300 w-full p-2 rounded-md"
                            title="Internal Number"
                            min={0}
                            max={10000}
                        />
                    </div>

                    {/* DATE TABLE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* FIRST CELL: START DATE */}
                        <div className="grid grid-rows-1">
                            <DatePicker
                                className="w-full p-2 border-2 border-gray-300 rounded-md"
                                selected={startDate}
                                onChange={(date)=> {
                                    if(date) {
                                        setStartDate(date)
                                    } else {
                                        setStartDate(new Date())
                                    } } }
                                showTimeSelect
                                dateFormat="MMMM, dd,  yyyy hh:mm aa"
                                placeholderText="Start Date*"
                            />
                        </div>

                        {/* SECOND CELL: END DATE */}
                        <div className="grid grid-rows-1">
                            <DatePicker
                                className="w-full p-2 border-2 border-gray-300 rounded-md"
                                selected={endDate}
                                onChange={(date)=> {
                                    if(date) {
                                        setEndDate(date)
                                    } else {
                                        setEndDate(new Date())
                                    } } }
                                showTimeSelect
                                dateFormat="MMMM, dd, yyyy hh:mm aa"
                                placeholderText="End Date*"
                            />
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
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
                        {/* STATUS BUTTON (PUBLIC 0R PRIVATE) */}
                        <div className="grid grid-rows-1 justify-start xs:justify-center lg:justify-start">
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
                    <EventDescription event={event} sections={sections} setSections={setSections}/>
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