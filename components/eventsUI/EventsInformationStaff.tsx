"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import { EventStatus } from "@prisma/client";
import { EventEditDescription } from "./editUI/EventEditDescription";
import 'react-datepicker/dist/react-datepicker.css';
import { IEventSection } from "@/entities/IEventSection";
import { ISectionFile } from "@/entities/ISectionFile";
import { useLogin } from '@/components/loginUI/LoginProvider';

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
  // Request constants and interfaces
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  // Send request logic
  const { userSession } = useLogin();

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

  // Request logic
  const handleRequest = async () => {
    if (!userSession?.id || !event?.id) {
      setToastMessage("Error: User session or event ID not found.");
      return;
    }

    try {
      // The API endpoint should ideally filter by userId and eventId.
      const response = await fetch(`/api/eventRequest?userId=${userSession.id}&eventId=${event.id}`);
      if (!response.ok) {
        throw new Error('Failed to check existing requests.');
      }
      const allRequestsForUserAndEvent = await response.json(); // This might be an array of all requests if backend isn't filtering

      // Client-side filtering
      const specificExistingRequests = Array.isArray(allRequestsForUserAndEvent) 
        ? allRequestsForUserAndEvent.filter(
            (req: any) => req.userId === userSession.id && req.eventId === event.id
          )
        : [];

      if (specificExistingRequests.length > 0) {
        setShowAlreadyRegistered(true);
      } else {
        setShowConfirmation(true);
      }
    } catch (err: any) {
      console.error("Error checking existing requests: ", err);
      setToastMessage(err.message || "Error checking existing requests.");
    }
  };

  const handleConfirmRequest = async () => {
    setShowConfirmation(false);
    if (!event || !userSession?.id) {
      setToastMessage("Error: No event or user session found");
      return;
    }

    try {
      const response = await fetch('/api/eventRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          userId: userSession.id,
          status: 'PENDING',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error sending event request');
      }

      const result = await response.json();
      if (result.success) {
        setToastMessage("Event request sent successfully!");
        setShowSuccess(true);
      } else {
        setToastMessage(result.error || "Error sending event request.");
      }
    } catch (err: any) {
      console.error("An error: ", err);
      setToastMessage(err.message || "Error sending event request.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setToastMessage(null);
    onClose();
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
            className="px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
            onClick={ handleRequest }
          >
            Request
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 hover:opacity-75 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {/* Confirmation */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-left">Are you sure to request this event?</h2>
              <p className="text-gray-700 mb-8">You will be placed in pending status at the event of {" "}<span className="font-semibold">{event?.name}</span> and you have to wait for acceptance.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className="px-4 py-2 bg-gray-400 hover:opacity-75 text-white rounded-md"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
                  onClick={handleConfirmRequest}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Already Registered Dialog */}
        {showAlreadyRegistered && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-left">Already Registered!</h2>
              <p className="text-gray-700 mb-7">You have already sent a request for the event <span className="font-semibold">{event?.name}</span>. Please wait for the event organizer to respond.</p>
              <div className="grid grid-cols-1 justify-items-center">
                <button
                  className="px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
                  onClick={() => setShowAlreadyRegistered(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-left">Your request has been sent!</h2>
                <p className="text-gray-700 mb-7">We will notify you when we accepted your application for this event.</p>
                <div className="grid grid-cols-1 justify-items-center">
                  <button
                    className="px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
                    onClick={handleCloseSuccess}
                  >
                    OK
                  </button>
                </div>
            </div>
          </div>
        )}
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
            {toastMessage}
          </div>
        )}
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