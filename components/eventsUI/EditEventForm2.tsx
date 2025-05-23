"use client";

import { useEffect, useRef, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IEventSection } from "@/entities/IEventSection";
import { EventDescription } from "./registerUI/EventDescription";
import { ISectionFile } from "@/entities/ISectionFile";

type EditEventFormProps = {
  event: IEvent;
  sections: (IEventSection & { files: ISectionFile[] })[];
  onSave: (
    updatedEvent: IEvent,
    updatedSections: (IEventSection & { files: ISectionFile[] })[]
  ) => void;
};

export const EditEventForm: React.FC<EditEventFormProps> = ({
  event,
  sections: initialSections,
  onSave,
}) => {
  const [name, setName] = useState<string>(event.name || "");
  const [city, setCity] = useState<string>(event.city || "");
  const [state, setState] = useState<string>(
    event.state || "California"
  );
  const [zipCode, setZipCode] = useState<string>(event.zipCode || "");
  const [address, setAddress] = useState<string>(event.address || "");

  const [startDate, setStartDate] = useState<Date>(new Date(event.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(event.endDate));
  const [publicEvent, setPublicEvent] = useState<boolean>(
    event.public || false
  );
  const [maxUsers, setMaxUsers] = useState<number>(event.maxUsers || 1);

  // State for sections and files
  const [sections, setSections] = useState<
    (IEventSection & { files: ISectionFile[] })[]
  >(
    initialSections.length > 0
      ? initialSections
      : [
          {
            id: 1,
            eventId: event.id,
            sectionName: "Section 1",
            description: "",
            files: [],
          },
        ]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (startDate && endDate && endDate < startDate) {
      alert("The end date cannot be earlier than the start date.");
      return;
    }

    if (parseInt(zipCode) < 0) {
      alert("The zip code cannot be less than 1.");
      return;
    }

    // Create updated event object
    const updatedEvent: IEvent = {
      ...event,
      name,
      state,
      city,
      zipCode,
      address,
      startDate,
      endDate,
      maxUsers,
      public: publicEvent,
      // Keep the original status
      status: event.status,
    };

    // Call the onSave callback with updated event and sections
    onSave(updatedEvent, sections);
  };

  return (
    <div className="p-1 my-4 h-full w-full overflow-visible overflow-y-scroll ">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
                  setStartDate(date);
                } else {
                  setStartDate(new Date());
                }
              }}
              showTimeSelect
              dateFormat="MMMM, dd, yyyy hh:mm aa"
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
                  setEndDate(date);
                } else {
                  setEndDate(new Date());
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
              <span className="ml-3 font-bold p-3">
                {publicEvent ? "Public" : "Private"}
              </span>
              {/* HIDDEN INPUT */}
              <input
                type="checkbox"
                checked={publicEvent}
                onChange={() => setPublicEvent(!publicEvent)}
                className="hidden"
              />
              {/* SWITCH BUTTON STYLE */}
              <div
                className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${
                  publicEvent ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {/* CIRCLE ANIMATION */}
                <div
                  className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                    publicEvent ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <EventDescription
          event={event}
          sections={sections}
          setSections={setSections}
        />

        {/* Save BUTTON */}
        <button
          type="submit"
          className="h-10 w-full p-2 sm:w-1/3 mt-6 rounded-md bg-blue-900 text-white font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
