"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { USAState } from "@/app/generated/prisma";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';

type EventFormProps = {
    title: string;
}

export const EventForm: React.FC<EventFormProps> = ({title}) => {

    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<USAState | null>(null);
    const [zipCode, setZipCode] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [internalNumber, setInternalNumber] = useState<number | null>(null);
    const [externalNumber, setExternalNumber] = useState<number | null>(null);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [publicEvent, setPublicEvent] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    const [maxUsers, setMaxUsers] = useState<number | null>(null);

    let event: IEvent;

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
                            required
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
                                onChange={(date)=> setStartDate(date)}
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
                                onChange={(date)=> setEndDate(date)}
                                showTimeSelect
                                dateFormat="MMMM, dd, yyyy hh:mm aa"
                                placeholderText="End Date*"
                            />
                        </div>

                    </div>

                    <input
                        type="number"
                        id="maxUsers"
                        value={maxUsers ?? ""}
                        required
                        onChange={(e) => setMaxUsers(Number(e.target.value))}
                        placeholder="Max Users*"
                        min={1}
                        max={10000}
                        className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
                        title="Max Users*"
                    />

                    {/* DESCRIPTION SECTION */}
                    <div className="w-full h-52  bg-cyan-900 mt-6 text-white">
                        User Story [PBI-EVNT-US6] - Event description sections go here.
                    </div>

                    {/* STATUS BUTTON (PUBLIC 0R PRIVATE) */}
                    <div className="w-full mt-4 mb-4 flex justify-center sm:justify-center lg:justify-start">
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
                            <div className={`w-20 h-7 flex items-center p-1 rounded-full transition-all ${publicEvent ? 'bg-green-500' : 'bg-red-500'}`}>
                                {/* CIRCLE ANIMATION */}
                                <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${publicEvent ? 'translate-x-12' : 'translate-x-0'}`} />
                            </div>
                        </label>
                    </div>

                    {/* Save BUTTON */}
                    <div className="w-full sm:w-1/3 pb-6">
                        <button
                            type="submit"
                            className="h-10 w-full p-2 rounded-md bg-blue-700 text-white font-bold">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}