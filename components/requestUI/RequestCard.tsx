import { IEvent } from "@/entities/IEvent";
import React, { useEffect, useState } from "react";
import { GenericRequestStatus } from "@prisma/client";
import { IEventUserList } from "@/entities/IEventUserList";
import { useLogin } from "../loginUI/LoginProvider";
import { EventsInformationStaff } from "@/components/eventsUI/EventsInformationStaff";

interface RequestCardProps {
    event: IEvent;
    onRequestCancel?: (message: string) => void;
    requestStatus: GenericRequestStatus;
    requestId: number;
}

const RequestCard: React.FC<RequestCardProps> = ({ event, onRequestCancel, requestStatus, requestId }) => {

    const { userSession } = useLogin();

    const { name, startDate } = event;
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [cancelRequestDialogOpen, setCancelRequestDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventUserList, setEventUserList] = useState<IEventUserList | null>(null)

    useEffect(() => {
        if (requestStatus === GenericRequestStatus.ACCEPTED) {
            loadAcceptedApplication();
        }

    }, []);

    const loadAcceptedApplication = async () => {
        fetch(`/api/eventUserList/findByUserAndEvent?userId=${userSession?.id}&eventId=${event?.id}`)
            .then(res => res.json())
            .then((data: { success: boolean; eventUserList: IEventUserList | null; error?: string }) => {
                if (!data.success) {
                    console.error("Error fetching event user list:", data.error || "Unknown error");
                    setEventUserList(null);
                    return;
                }

                setEventUserList(data.eventUserList);
            })
            .catch(error => console.error("Error fetching or parsing event user list:", error));
    }

    const cancelRequest = async (eventId: number): Promise<void> => {
        try {
            // Delete the event from the database
            const response = await fetch(`/api/eventRequest/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            } else {
                console.log('Event deleted successfully');
                if (onRequestCancel) {
                    onRequestCancel("Request cancelled successfully!");
                } else {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        } finally {
        }

    }

    return (
        <div className="mx-3 my-7 bg-white shadow-md px-5 py-10 rounded-xl">
            {/* Event name (maximum 20 characters) */}
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Event:{' '}
                <span className="font-normal normal-case">
                    {name.length > 20 ? name.substring(0, 20) + '...' : name}
                </span>
            </p>

            <hr className="border-t-2 border-gray-300 my-2" />

            {/* Start date */}
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Start:{' '}
                <span className="font-normal normal-case">
                    {new Date(startDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    }).replace(",", "")}
                </span>
            </p>

            {/* Condition to add elements based on status */}
            {requestStatus === GenericRequestStatus.PENDING ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <div className="flex justify-center mt-5">
                        <div className="flex justify-center gap-4 w-full">
                            <button
                                type="button"
                                className="w-1/2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:opacity-75 text-white rounded-2xl font-bold"
                                onClick={() => {
                                    setIsSubmitting(true);
                                    setCancelRequestDialogOpen(true);
                                }}
                            >
                                {isSubmitting ? "Canceling..." : "Cancel"}
                            </button>

                            <button
                                type="button"
                                className="w-1/2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:opacity-75 text-white rounded-2xl font-bold"
                                onClick={() => setSelectedEvent(event)}
                            >
                                Resume
                            </button>
                        </div>
                    </div>
                </>
            ) : requestStatus === GenericRequestStatus.ACCEPTED ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <p className="font-bold text-gray-700 uppercase">Role: <span className="font-normal normal-case">{eventUserList?.role}</span></p>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="w-1/2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:opacity-75 text-white rounded-2xl font-bold"
                            onClick={() => setSelectedEvent(event)}
                        >
                            Resume
                        </button>
                    </div>
                </>
            ) : requestStatus === GenericRequestStatus.REJECTED ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="w-1/2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:opacity-75 text-white rounded-2xl font-bold"
                            onClick={() => setSelectedEvent(event)}
                        >
                            Resume
                        </button>
                    </div>
                </>
            ) : null}

            {cancelRequestDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-md p-6 shadow-md w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-left">
                            Are you sure you want to delete your request for this event?
                        </h3>

                        <p className="text-sm text-gray-600 mb-6">
                            Your application to work on the <span className="font-semibold">{event.name}</span> will be removed from the waiting list.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 hover:opacity-75 text-white rounded-md"
                                onClick={() => {
                                    setIsSubmitting(false);
                                    setCancelRequestDialogOpen(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
                                onClick={() => {
                                    setIsSubmitting(false);
                                    cancelRequest(event.id);
                                    setCancelRequestDialogOpen(false);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedEvent && (
                <EventsInformationStaff
                    eventId={selectedEvent.id}
                    onClose={() => setSelectedEvent(null)}
                    action={false}
                />
            )}
        </div>
    );
};

export default RequestCard;