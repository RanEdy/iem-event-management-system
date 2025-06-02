"use client";

import { EventStatus } from "@prisma/client";
import { IEvent } from "@/entities/IEvent";
import { FaPlus, FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ContextMenu from "../commonUI/ContextMenu";
import { EventForm } from "./registerUI/EventForm";
import { EventsInformation } from "./EventsInformation"; // Add this import

export const EventsTable: React.FC = () =>
{
    const [events, setEvents] = useState<IEvent[]>([])
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // Add this state

    const loadEvents = async () =>
    {
        fetch("api/event")
        .then(res => res.json())
        .then((data: IEvent[]) => {
            // Cast string dates to Date objects and filter only events in process
            const parsedEvents = data
                .filter(event => event.status === EventStatus.IN_PROCESS)
                .map(event => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
            setEvents(parsedEvents);
        })
        .catch(error => console.error("Error fetching or parsing events:", error));
    }

    useEffect(() => {
        if (searchTerm)
        {
            const filteredEvents = events.filter((event) =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase())
            || event.id.toString().includes(searchTerm.toLowerCase()));
            setEvents(filteredEvents)
        }
        else
        {
            loadEvents();
        }
    }, [searchTerm]);
      
    const handleRowClick = (row: IEvent) =>
    {
        console.log("Selected Event: ", row);
        setSelectedEvent(row);
    };

    const columns: TableColumn<IEvent>[] = [
        {
            name: "ID",
            selector: row => row.id
        },
        {
            name: "EVENT",
            selector: row => row.name,
        },
        {
            name: "ADDRESS",
            cell: row => <div className="flex flex-row items-center h-1/3">
                <div className="block items-center">
                    <div className="font-extrabold">
                        {row.state + ", " + row.city + " " + row.zipCode + ". "}
                    </div>
                    <div className="font-extrabold text-zinc-600">
                        {row.address}
                    </div>
                </div>
            </div>,
            //minWidth: "350px",
        },
        {
            name: "DATE",
            cell: row => <div className="flex flex-row items-center h-1/3 p-4 py-6 rounded-lg bg-zinc-200">
                <div className="block items-center">
                    <div className="font-extrabold">
                        {/* Make sure row.startDate is a Date object*/}
                        {row.startDate instanceof Date ? row.startDate.toDateString() : 'Invalid Date'}
                    </div>
                    <div className="font-extrabold text-zinc-600">
                        {/* Make sure row.startDate is a Date object*/}
                        {row.startDate instanceof Date ? `${row.startDate.getHours()}:${row.startDate.getMinutes() === 0 ? "00" : row.startDate.getMinutes()}` : ''}
                    </div>
                </div>
            </div>,
            //minWidth: "150px"
        },
        {
            name: "DURATION",
            selector: row => {
                const durationMs = row.endDate.getTime() - row.startDate.getTime();

                const msInHour = 1000 * 60 * 60;
                const msInDay = msInHour * 24;

                const days = Math.floor(durationMs / msInDay);
                const hours = Math.floor((durationMs % msInDay) / msInHour);

                let durationText = "";
                if (days > 0) durationText += `${days} day${days > 1 ? "s" : ""} `;
                if (hours > 0) durationText += `${hours} hour${hours > 1 ? "s" : ""} `;

                return durationText.trim();
            },
        },
        {
            name: "VISIBILITY",
            cell: row => <>
                {
                    row.public ? <div className="flex flex-column items-center">
                        <div className="w-3 h-3 rounded-full bg-lime-600 self-center mr-3"></div>
                        <div className="font-bold">Public</div>
                    </div>
                        :
                        <div className="flex flex-column items-center">
                            <div className="w-3 h-3 rounded-full bg-red-700 self-center mr-3"></div>
                            <div className="font-bold">Private</div>
                        </div>
                }
            </>
        },
        {
            name: "USERS",
            selector: row => "0/" + row.maxUsers
        },
        {
            name: "REQUESTS",
            selector: row => 0,
        },
        {
            name: "OPTIONS",
            cell: row => <ContextMenu row={row} OnCompleted={() => {
                loadEvents();
            }
            } />,
            ignoreRowClick: true,
        }
    ]

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            {showToast && (
                <div className="fixed top-5 left-1/2 transform-translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {toastMessage}
                </div>
            )}
            <div className="p-4 flex flex-colum justify-between lg:w-1/2">
                <div>Total Events: <span className="font-bold">{" " + events.length}</span></div>
                <div>Public Events: <span className="font-bold">{" " + events.filter((event) => {if (event.public) return event}).length}</span></div>
                <div>Private Events: <span className="font-bold">{" " + events.filter((event) => {if (!event.public) return event}).length}</span></div>
            </div>
            <hr/>

            <div className="flex flex-colum justify-between m-2">
                {/* SEARCH BAR */}
                <div className="flex flex-column min-w-56 lg:w-1/3 h-12 border-2 m-2 p-2 bg-bluedark-gradient-r border-zinc-100 rounded-2xl items-center">
                    <FaSearch className="text-white m-2 mr-3"/>
                    <input
                    type="text"
                    className="flex self-center w-full h-full p-1 bg-white rounded-xl"
                    value={searchTerm}
                    placeholder=" Search by name or id..."
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>


                {/* ADD NEW EVENT BUTTON */}
                <div className="w-28 md:min-w-52 h-12 bg-bluedark-gradient-r border-2 m-2 border-zinc-100 rounded-2xl " onClick={() => setIsDialogOpen(true)}>
                    <button className="flex flex-column pl-3 h-full w-full text-center font-bold bg-white bg-opacity-0 hover:bg-opacity-20 text-white items-center">
                        <FaPlus className="text-white mx-2"/> <span className="text-xs md:text-base">ADD NEW EVENT</span>
                    </button>
                </div>
                
                {/* EVENT DIALOG */}
                {isDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
                        <div className="relative bg-white rounded-3xl p-8 shadow-lg realtive my-4 lg:w-1/2 w-full h-full lg:h-full ">
                            {/* CLOSE BUTTON */}
                            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsDialogOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {/* CHILDREN OR CONTENT*/}
                            { <EventForm title="Register Event" 
                                onSave={() =>
                                {
                                    loadEvents();
                                }}/>
                            }
                        </div>
                    </div>
                )}
            </div>

            <DataTable
            className="h-[65%] overflow-visible"
            columns={columns}
            data={events}
            onRowClicked={handleRowClick}
            pointerOnHover
            highlightOnHover
            pagination
            fixedHeader
            customStyles={{headCells: {style: {fontWeight: "bold",backgroundColor: "#F5F5F5", borderRadius: "0"}}}}
            />

            {/* Event Information Modal */}
            {selectedEvent && (
                <EventsInformation
                    eventId={selectedEvent.id}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}