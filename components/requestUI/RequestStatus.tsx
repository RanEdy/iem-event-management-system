"use client";

import React, { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import RequestCard from "./RequestCard";
import { EventStatus } from "@prisma/client";
import { IEventRequest } from "@/entities/IEventRequest";
import { IEventUserList } from "@/entities/IEventUserList";
import { GenericRequestStatus } from "@prisma/client";
import { useLogin } from "../loginUI/LoginProvider";

export const RequestStatus: React.FC = () => {
    const { userSession } = useLogin();

    const [events, setEvents] = useState<IEvent[]>([]);
    // Toast message that pairs with RequestCard
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [eventRequest, setEventRequest] = useState<IEventRequest[]>([]);

    const loadEvents = async () => {
        fetch("api/event")
            .then(res => res.json())
            .then((data: IEvent[]) => {
                // Convert string dates to Date objects and filter only ongoing events
                const parsedEvents = data.map(event => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
                setEvents(parsedEvents);
            })
            .catch(error => console.error("Error fetching or parsing events:", error));
    };

    const loadRequests = async () => {
        fetch(`/api/eventRequest/findByUserId?id=${userSession?.id}`)
            .then(res => res.json())
            .then((data: { success: boolean; requests: IEventRequest[]; error?: string }) => {
                if (!data.success) {
                    console.error("Error fetching event requests:", data.error || "Unknown error");
                    setEventRequest([]); // Returns an empty array if an error occurs
                    return;
                }

                // Stores requests in state
                setEventRequest(data.requests);
            })
            .catch(error => console.error("Error fetching or parsing event requests:", error));
    };

    const loadAcceptedApplications = async () => {
        // Function to load accepted applications (To be implemented)
    };

    const handleRequestCancelled = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        loadRequests(); // Reloads requests to update the table
        setTimeout(() => setShowToast(false), 3000); // Hides toast after 3 seconds
    };

    useEffect(() => {
        console.log("CURRENT USER:", userSession?.name);
        console.log("CURRENT USER LEVEL:", userSession?.level);
        console.log("CURRENT USER ID:", userSession?.id);
        loadRequests();

        // Check if there are any accepted requests before loading accepted applications
        if (eventRequest.some(request => request.status === GenericRequestStatus.ACCEPTED)) {
            loadAcceptedApplications();
        }
    }, []);

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            <div className="p-4 flex flex-col sm:flex-row justify-between lg:w-2/3 md:items-center md:w-[88%]">
                <div className="p-4 rounded text-center">Total applications: <span className="font-bold">{" " + eventRequest.length}</span></div>
                <div className="p-4 rounded text-center">Rejected applications: <span className="font-bold">{" " + eventRequest.filter(request => request.status === GenericRequestStatus.REJECTED).length}</span></div>
                <div className="p-4 rounded text-center">Pending applications: <span className="font-bold">{" " + eventRequest.filter(request => request.status === GenericRequestStatus.PENDING).length}</span></div>
                <div className="p-4 rounded text-center">Accepted applications: <span className="font-bold">{" " + eventRequest.filter(request => request.status === GenericRequestStatus.ACCEPTED).length}</span></div>
            </div>

            <hr className="border-t-2 border-gray-300 w-[98%] mx-auto " />

            <div className="w-full h-auto grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                {/* Rejected Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Rejected Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {eventRequest
                            .filter(request => request.status === GenericRequestStatus.REJECTED) // Filters only rejected requests
                            .filter(request => request.event.status === EventStatus.IN_PROCESS) // Filters only ongoing events
                            .sort((a, b) => new Date(a.event.startDate).getTime() - new Date(b.event.startDate).getTime()) // Sorts by start date
                            .map(request => ( // Maps the entire request object, not just the event
                                <RequestCard
                                    key={request.id} // Uses request ID as the key
                                    event={request.event} // Passes the event
                                    requestId={request.id} // Passes the request ID as a prop
                                    requestStatus={GenericRequestStatus.REJECTED} // Passes the request status
                                    onRequestCancel={handleRequestCancelled}
                                />
                            ))}
                    </div>
                </div>

                {/* Pending Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Pending Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {eventRequest
                            .filter(request => request.status === GenericRequestStatus.PENDING) // Filters only pending requests
                            .filter(request => request.event.status === EventStatus.IN_PROCESS) // Filters only ongoing events
                            .sort((a, b) => new Date(a.event.startDate).getTime() - new Date(b.event.startDate).getTime()) // Sorts by start date
                            .map(request => (
                                <RequestCard
                                    key={request.id}
                                    event={request.event}
                                    requestId={request.id}
                                    requestStatus={GenericRequestStatus.PENDING}
                                    onRequestCancel={handleRequestCancelled}
                                />
                            ))}
                    </div>
                </div>

                {/* Accepted Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Accepted Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {eventRequest
                            .filter(request => request.status === GenericRequestStatus.ACCEPTED) // Filters only accepted requests
                            .filter(request => request.event.status === EventStatus.IN_PROCESS) // Filters only ongoing events
                            .sort((a, b) => new Date(a.event.startDate).getTime() - new Date(b.event.startDate).getTime()) // Sorts by start date
                            .map(request => (
                                <RequestCard
                                    key={request.id}
                                    event={request.event}
                                    requestId={request.id}
                                    requestStatus={GenericRequestStatus.ACCEPTED}
                                    onRequestCancel={handleRequestCancelled}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* Toast message, an alternative would be using a modal */}
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};