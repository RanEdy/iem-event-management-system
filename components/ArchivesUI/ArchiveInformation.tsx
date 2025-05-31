"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";

interface ArchiveInformationProps {
  eventId: number;
  onClose: () => void;
}

export const ArchiveInformation: React.FC<ArchiveInformationProps> = ({ eventId, onClose }) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/event/${eventId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch event data for ID ${eventId}`);
        }
        const data = await response.json();
        if (data.success && data.event) {
          // Convert date strings to Date objects
          const eventData = {
            ...data.event,
            startDate: new Date(data.event.startDate),
            endDate: new Date(data.event.endDate),
          };
          setEvent(eventData);
        } else if (data && typeof data.id !== 'undefined') {
          // Convert date strings to Date objects
          const eventData = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
          };
          setEvent(eventData);
        } else {
          throw new Error(data.error || "Event not found or invalid response structure.");
        }
      } catch (err: any) {
        console.error("Error fetching event:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatDuration = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return "N/A";
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ${diffMinutes > 0 ? `and ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}` : ""}`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    }
  };

  const getStatusBadge = (status: string) => {
    let colorClass = "bg-gray-200 text-gray-700";
    switch (status) {
      case "DONE":
        colorClass = "bg-green-500 text-white";
        break;
      case "CANCELLED":
        colorClass = "bg-red-500 text-white";
        break;
      case "PENDING":
        colorClass = "bg-yellow-500 text-white";
        break;
      case "IN_PROGRESS":
        colorClass = "bg-blue-500 text-white";
        break;
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
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
            Event Information
          </div>
        </div>
        <hr className="w-[100%] border-t-4 border-cyan-900 mb-6" />

        {isLoading && <p className="text-center text-gray-600">Loading event data...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {event && !isLoading && !error && (
          <div className="space-y-1">
            {/* Basic Event Information */}
            <InfoItem label="Event ID" value={event.id?.toString()} />
            <InfoItem label="Event Name" value={event.name} />
            <InfoItem label="Status" value={getStatusBadge(event.status)} isComponent />
            
            {/* Location Information */}
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Location</h3>
            <InfoItem label="Address" value={event.address} />
            <InfoItem label="City" value={event.city} />
            <InfoItem label="State" value={event.state} />
            <InfoItem label="Zip Code" value={event.zipCode} />
            
            {/* Date and Time Information */}
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Schedule</h3>
            <InfoItem label="Start Date" value={formatDate(event.startDate)} />
            <InfoItem label="End Date" value={formatDate(event.endDate)} />
            <InfoItem label="Duration" value={formatDuration(event.startDate, event.endDate)} />
            
            {/* Event Settings */}
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Settings</h3>
            <InfoItem 
              label="Visibility" 
              value={event.public ? "Public" : "Private"} 
              highlight={event.public ? "green" : "red"} 
            />
            <InfoItem label="Max Users" value={event.maxUsers?.toString()} />
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
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
  value: string | undefined | null | React.ReactNode;
  highlight?: "green" | "red";
  isComponent?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, highlight, isComponent = false }) => {
  let valueClass = "text-gray-700";
  if (highlight === "green") valueClass = "text-green-600 font-semibold";
  if (highlight === "red") valueClass = "text-red-600 font-semibold";

  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-b-0">
      <dt className="text-sm font-medium text-gray-500 col-span-1">{label}:</dt>
      <dd className={`text-sm ${isComponent ? '' : valueClass} col-span-2 break-words`}>
        {isComponent ? value : (value || "N/A")}
      </dd>
    </div>
  );
};

export default ArchiveInformation;