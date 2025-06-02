"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus } from "@prisma/client";
import { EventEditDescription } from "./editUI/EventEditDescription";
import 'react-datepicker/dist/react-datepicker.css';
import { IEventSection } from "@/entities/IEventSection";
import { ISectionFile } from "@/entities/ISectionFile";

// Define EditableFile type as it's used in EventEditDescription
type EditableFile = ISectionFile & { file?: File; isNew?: boolean };

interface EventsInformationStaffProps {
  eventId: number;
  onClose: () => void;
}

export const EventsInformationStaff: React.FC<EventsInformationStaffProps> = ({
  eventId,
  onClose
}) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [sections, setSections] = useState<(IEventSection & { files: EditableFile[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch event details
        const eventResponse = await fetch(`/api/event/${eventId}`);
        if (!eventResponse.ok) {
          const errorData = await eventResponse.json();
          throw new Error(errorData.message || `Failed to fetch event data for ID ${eventId}`);
        }
        const eventData = await eventResponse.json();
        if (eventData.success && eventData.event) {
          setEvent({
            ...eventData.event,
            startDate: new Date(eventData.event.startDate),
            endDate: new Date(eventData.event.endDate)
          });
        } else if (eventData && typeof eventData.id !== 'undefined') {
          setEvent({
            ...eventData,
            startDate: new Date(eventData.startDate),
            endDate: new Date(eventData.endDate)
          });
        } else {
          throw new Error(eventData.error || "Event not found or invalid response structure.");
        }

        // Fetch sections and files
        const sectionsResponse = await fetch(`/api/eventSection/findByEvent?id=${eventId}`);
        const sectionsData = await sectionsResponse.json();

        if (sectionsData && Array.isArray(sectionsData)) {
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
          // If no sections exist, provide a default empty section for display
          setSections([{
            id: Date.now(), // temporal ID, won't be saved
            eventId: eventId,
            sectionName: "Description",
            description: "No description available for this event.",
            files: [],
          }]);
        }

      } catch (err: any) {
        console.error("Error fetching event:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const formatDateTime = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return "Invalid Date";

      return dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatAddress = (event: IEvent) => {
    const addressParts = [];
    if (event.address) addressParts.push(event.address);
    if (event.city) addressParts.push(event.city);
    if (event.state) addressParts.push(event.state);
    if (event.zipCode) addressParts.push(event.zipCode);

    return addressParts.length > 0 ? addressParts.join(", ") : "N/A";
  };

  const getStatusDisplay = (status: EventStatus) => {
    switch (status) {
      case EventStatus.IN_PROCESS:
        return { text: "En Proceso", color: "text-blue-600" };
      case EventStatus.DONE:
        return { text: "Completado", color: "text-green-600" };
      case EventStatus.CANCELLED:
        return { text: "Cancelado", color: "text-red-600" };
      default:
        return { text: status, color: "text-gray-600" };
    }
  };

  const calculateDuration = (startDate: Date, endDate: Date) => {
    const durationMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;
    }
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  const statusDisplay = event ? getStatusDisplay(event.status) : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-2/3 w-11/12 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-5 justify-self-center">
          <div className="text-cyan-900 text-center text-3xl lg:text-4xl font-extrabold font-maven">
            Event Details
          </div>
        </div>
        <hr className="w-[100%] border-t-4 border-cyan-900 mb-6" />

        {isLoading && <p className="text-center text-gray-600">Loading event data...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {event && !isLoading && !error && (
          <div className="space-y-1">
            {/* Event Basic Information */}
            <InfoItem label="Event Name" value={event.name} />

            {/* Date and Time Information */}
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Date & Time</h3>
            <InfoItem label="Start Date" value={formatDateTime(event.startDate)} />
            <InfoItem label="End Date" value={formatDateTime(event.endDate)} />
            <InfoItem
              label="Duration"
              value={event.startDate && event.endDate ? calculateDuration(event.startDate, event.endDate) : "N/A"}
            />

            {/* Location Information */}
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Location</h3>
            <InfoItem label="State" value={event.state} />
            <InfoItem label="City" value={event.city} />
            <InfoItem label="Address" value={event.address} />
            <InfoItem label="Zip Code" value={event.zipCode} />
            <InfoItem label="Complete Address" value={formatAddress(event)} />

            {/* Event Description Sections - Read-only view */}
            {event && sections.length > 0 && (
              <EventEditDescription
                event={event}
                sections={sections}
                setSections={() => {}} // Disable setSections as it's read-only
                isViewMode={true} // Add a new prop to indicate view mode
              />
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            className="bg-blue-500 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-600"
            onClick={() => { /* Add request logic here */ }}
          >
            Request
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white font-bold px-6 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string | undefined | null;
  highlight?: "green" | "red" | string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, highlight }) => {
  let valueClass = "text-gray-700";
  if (highlight === "green") valueClass = "text-green-600 font-semibold";
  if (highlight === "red") valueClass = "text-red-600 font-semibold";
  if (highlight && !["green", "red"].includes(highlight)) valueClass = highlight;

  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-b-0">
      <dt className="text-sm font-medium text-gray-500 col-span-1">{label}:</dt>
      <dd className={`text-sm ${valueClass} col-span-2 break-words`}>{value || "N/A"}</dd>
    </div>
  );
};

export default EventsInformationStaff;