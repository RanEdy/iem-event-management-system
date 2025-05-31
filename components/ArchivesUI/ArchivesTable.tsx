"use client";

import { USAState } from "@prisma/client";
import { IEvent } from "@/entities/IEvent";
import { FaSearch, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ContextMenuArchives from "../commonUI/ContexMenuArchives";
import { ArchiveInformation } from "./ArchiveInformation"; // Import the new component

export const ArchivesTable: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([])
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [selectedDate, setSelectedDate] = useState<string>(""); // State for dates
    const [toastMessage, setToastMessage] = useState(""); // State for message
    const [showToast, setShowToast] = useState(false); // State
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // State for selected event

    const loadEvents = () => {
        fetch("api/event")
            .then(res => res.json())
            .then((data: IEvent[]) => {
                // Convert date strings to Date objects and filter only completed events
                const parsedEvents = data
                    .filter(event => event.status === 'DONE' || event.status === 'CANCELLED')
                    .map(event => ({
                        ...event,
                        startDate: new Date(event.startDate),
                        endDate: new Date(event.endDate),
                    }));
                setEvents(parsedEvents);
            })
            .catch(error => console.error("Error fetching or processing archived events:", error));
    };

    useEffect(() => {
        loadEvents();
    }, []);

    // Handler for when an event is deleted
    const handleEventDeleted = (message: string) => {
        loadEvents(); // Reload event list
    };

    const handleRowClick = (row: IEvent) => {
        console.log("Selected Event: ", row);
        setSelectedEvent(row); // Set the selected event to show modal
    }

    // Handler to update the search term
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handler to update the selected date
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    // Filter events based on search term and selected date
    const filteredEvents = events.filter(event => {
        const matchesSearchTerm = event.name.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (selectedDate) {
            // Normalize the event date to YYYYY-MM-DD for comparison.
            const eventDate = new Date(event.startDate);
            const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
            matchesDate = eventDateString === selectedDate;
        }

        return matchesSearchTerm && matchesDate;
    });

    // Function to calculate duration in days
    const calculateDurationInDays = (startDate: Date, endDate: Date): number => {
        const diffInMs = endDate.getTime() - startDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
    };

    // Update column definition to pass the callback
    const columns: TableColumn<IEvent>[] = [
        {
            name: "EVENT",
            selector: row => row.name,
        },
        {
            name: "ADDRESS",
            cell: row => <div className="flex flex-row items-center h-1/3">
                <div className="block items-center">
                    <div className="font-extrabold">
                        {row.state.charAt(0) + row.state.substring(1).toLowerCase()
                        + ", " + row.city + " " + row.zipCode + ". "}
                    </div>
                    <div className="font-extrabold text-zinc-600">
                        {row.address}
                    </div>
                </div>
            </div>,
        },
        {
            name: "START DATE",
            cell: row => <div className="flex flex-row items-center h-1/3 p-4 py-6 rounded-lg bg-zinc-200">
                <div className="block items-center">
                    <div className="font-extrabold">
                        {row.startDate instanceof Date ? row.startDate.toDateString() : 'Invalid Date'}
                    </div>
                    <div className="font-extrabold text-zinc-600">
                        {row.startDate instanceof Date ? `${row.startDate.getHours()}:${row.startDate.getMinutes() === 0 ? "00" : row.startDate.getMinutes()}` : ''}
                    </div>
                </div>
            </div>,
        },
        {
            name: "END DATE",
            cell: row => <div className="flex flex-row items-center h-1/3 p-4 py-6 rounded-lg bg-zinc-200">
                <div className="block items-center">
                    <div className="font-extrabold">
                        {row.endDate instanceof Date ? row.endDate.toDateString() : 'Invalid Date'}
                    </div>
                    <div className="font-extrabold text-zinc-600">
                        {row.endDate instanceof Date ? `${row.endDate.getHours()}:${row.endDate.getMinutes() === 0 ? "00" : row.endDate.getMinutes()}` : ''}
                    </div>
                </div>
            </div>,
        },
        {
            name: "DURATION",
            selector: row => calculateDurationInDays(row.startDate, row.endDate),
            format: row => calculateDurationInDays(row.startDate, row.endDate).toFixed(2) + " days",
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
            name: "DELETE",
            cell: row => (
                <ContextMenuArchives 
                    row={row} 
                    onEventDeleted={handleEventDeleted}
                    directDelete={true}
                />
            ),
            ignoreRowClick: true,
        }
    ];

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            {showToast && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {toastMessage}
                </div>
            )}
            <div className="p-4 flex flex-colum justify-between lg:w-1/2">
                {/* Use filteredEvents.length for the counters if you want them to reflect the search. */}
                <div>Total Archived Events: <span className="font-bold">{" " + filteredEvents.length}</span></div>
                <div>Public Events: <span className="font-bold">{" " + filteredEvents.filter((event) => event.public).length}</span></div>
                <div>Private Events: <span className="font-bold">{" " + filteredEvents.filter((event) => !event.public).length}</span></div>
            </div>
            <hr/>

            <div className="flex flex-wrap items-center justify-between m-2 p-2 gap-4"> {/* Fitted for flex-wrap and gap */}
                {/* SEARCH BAR */}
                <div className="flex items-center min-w-56 lg:w-1/3 h-12 border-2 p-2 bg-white border-gray-300 rounded-lg"> {/* Style similar to UsersTable */}
                    <FaSearch className="text-gray-400 m-2 mr-3"/>
                    <input
                        type="text"
                        className="flex self-center w-full h-full p-1 bg-transparent focus:outline-none"
                        placeholder="Search archived events by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* DATE FILTER */}
                <div className="flex items-center min-w-56 h-12 border-2 p-2 bg-white border-gray-300 rounded-lg"> {/* Similar style */}
                    <input
                        type="date"
                        className="flex self-center w-full h-full p-1 bg-transparent focus:outline-none text-gray-700"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            <DataTable
                className="h-[65%] overflow-visible"
                columns={columns}
                data={filteredEvents} // Using filtered events
                onRowClicked={handleRowClick} // Updated to set selected event
                pointerOnHover
                highlightOnHover
                pagination
                fixedHeader
                noDataComponent={searchTerm ? "No events match your search" : "No archived events available"} // Mensaje dinámico
                customStyles={{ headCells: { style: { fontWeight: "bold", backgroundColor: "#F5F5F5", borderRadius: "0" } } }}
            />

            {/* Event Information Modal */}
            {selectedEvent && (
                <ArchiveInformation
                    eventId={selectedEvent.id}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}