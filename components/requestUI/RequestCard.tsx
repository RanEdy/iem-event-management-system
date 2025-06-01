import React from 'react';
import { IEvent } from "@/entities/IEvent";

const RequestCard: React.FC<{ event: IEvent }> = ({ event }) => {
    const { name, startDate, status } = event;

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
                        <button className="bg-gradient-to-r from-gray-800 to-gray-600   hover:opacity-75 text-white px-4 py-2 rounded-2xl font-bold  w-2/3">
                            Cancel
                        </button>
                    </div>
                </>
            ) : status === "DONE" ? (
                <>
                    <hr className="border-t-2 border-gray-300 my-2" />
                    <p className="font-bold text-gray-700 uppercase">Role: {status}</p>
                </>
            ) : null}
        </div>
    );
};

export default RequestCard;