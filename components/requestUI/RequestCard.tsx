import { IEvent } from "@/entities/IEvent";
import React, { useEffect, useState } from "react";

const RequestCard: React.FC<{ event: IEvent }> = ({ event }) => {
    const { name, startDate, status } = event;
    const [cancelRequestDialogOpen, setCancelRequestDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);



    const cancelRequest = async (eventId: number): Promise<void> => {
        try {
            // First, get the event information
            const eventResponse = await fetch(`/api/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!eventResponse.ok) {
                throw new Error('Error getting event information');
            }

            const event = await eventResponse.json();
            const currentDate = new Date();
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);

            // Verify if the current date is within the event's date range
            // Note: For files, this logic may need to be adjusted or deleted if not applicable.
            // For now, the original logic is maintained.
            if (currentDate >= startDate && currentDate <= endDate) {
                return;
            }

            // Delete the event from the database
            const response = await fetch(`/api/event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            } else {
                console.log('Event deleted successfully');
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
            {status === "IN_PROCESS" ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <div className="flex justify-center mt-5">
                        <button
                            className="bg-gradient-to-r from-gray-800 to-gray-600   hover:opacity-75 text-white px-4 py-2 rounded-2xl font-bold  w-2/3"
                            onClick={() => {
                                setIsSubmitting(true);
                                setCancelRequestDialogOpen(true);
                            }}
                        >
                            {isSubmitting ? "Canceling..." : "Cancel"}
                        </button>
                    </div>
                </>
            ) : status === "DONE" ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <p className="font-bold text-gray-700 uppercase">Role: {status}</p>
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
        </div>
    );
};

export default RequestCard;