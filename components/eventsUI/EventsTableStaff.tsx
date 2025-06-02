"use client";

import { EventStatus } from "@prisma/client";
import { IEvent } from "@/entities/IEvent";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { EventsInformationStaff } from "./EventsInformationStaff"; // Import the new component

export const EventsTableStaff: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "public" | "private">("all");
    const [startDateFilter, setStartDateFilter] = useState("");
    const [endDateFilter, setEndDateFilter] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // State for selected event

    const columns: TableColumn<IEvent>[] = [
        {
            name: "EVENT",
            selector: row => row.name,
            sortable: true,
            minWidth: "200px",
        },
        /*{
            name: "SUMMARY",
            cell: row => (
                <div className="py-2">
                    <div className="text-sm text-gray-600 line-clamp-2">
                        {row.description || "No description"}
                    </div>
                </div>
            ),
            minWidth: "250px",
        },*/
        {
            name: "DATE",
            cell: row => (
                <div className="flex flex-col py-2">
                    <div className="font-bold text-sm">
                        {row.startDate instanceof Date 
                            ? row.startDate.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })
                            : 'Invalid Date'
                        }
                    </div>
                    <div className="text-xs text-gray-600">
                        {row.startDate instanceof Date 
                            ? `${row.startDate.getHours().toString().padStart(2, '0')}:${row.startDate.getMinutes().toString().padStart(2, '0')} p.m.`
                            : ''
                        }
                    </div>
                </div>
            ),
            sortable: true,
            sortFunction: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
            minWidth: "120px",
        },
        {
            name: "DURATION",
            selector: row => {
                const durationMs = new Date(row.endDate).getTime() - new Date(row.startDate).getTime();
                const hours = Math.floor(durationMs / (1000 * 60 * 60));
                return `${hours} hour${hours !== 1 ? 's' : ''}`;
            },
            sortable: true,
            minWidth: "100px",
        },
        {
            name: "VISIBILITY",
            cell: row => (
                <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                        row.public ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">
                        {row.public ? 'Public' : 'Private'}
                    </span>
                </div>
            ),
            sortable: true,
            minWidth: "100px",
        },
        {
            name: "USERS",
            selector: row => `${row.registeredUsers || 0} / ${row.maxUsers}`,
            sortable: true,
            minWidth: "80px",
        },
        {
            name: "REQUESTS",
            selector: row => row.pendingRequests || 0,
            sortable: true,
            minWidth: "100px",
        }
    ];

    const loadEvents = async () => {
        try {
            const response = await fetch("api/event");
            const data: IEvent[] = await response.json();
            
            // Filter and parse events according to PBI criteria
            const parsedEvents = data
                .filter(event => {
                    // Only show public events that are not archived and have future/current dates
                    const eventDate = new Date(event.startDate);
                    const now = new Date();
                    
                    return event.status === EventStatus.IN_PROCESS &&
                           event.public === true &&
                           eventDate >= now;
                })
                .map(event => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }))
                // Sort by start date (closest first)
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            
            setEvents(parsedEvents);
            setFilteredEvents(parsedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...events];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(event => {
                if (statusFilter === "public") return event.public;
                if (statusFilter === "private") return !event.public;
                return true;
            });
        }

        // Date range filters
        if (startDateFilter) {
            const startDate = new Date(startDateFilter);
            filtered = filtered.filter(event => 
                new Date(event.startDate) >= startDate
            );
        }

        if (endDateFilter) {
            const endDate = new Date(endDateFilter);
            filtered = filtered.filter(event => 
                new Date(event.endDate) <= endDate
            );
        }

        setFilteredEvents(filtered);
    }, [events, searchTerm, statusFilter, startDateFilter, endDateFilter]);

    useEffect(() => {
        loadEvents();
    }, []);

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setStartDateFilter("");
        setEndDateFilter("");
    };

    // Handle row click to open event details modal
    const handleRowClick = (row: IEvent) => {
        console.log("Selected Event: ", row);
        setSelectedEvent(row);
    };

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            {/* Summary Statistics */}
            <div className="p-4 flex flex-row justify-between lg:w-full bg-gray-50">
                <div className="flex space-x-6">
                    <div>
                        Total Events: <span className="font-bold">{events.length}</span>
                    </div>
                    <div>
                        Public Events: <span className="font-bold">
                            {events.filter(event => event.public).length}
                        </span>
                    </div>
                    <div>
                        Private Events: <span className="font-bold">
                            {events.filter(event => !event.public).length}
                        </span>
                    </div>
                </div>
            </div>
            <hr />

            {/* Search and Filter Controls */}
            <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Search Bar */}
                    <div className="flex items-center min-w-64 h-10 border-2 px-3 bg-blue-600 border-zinc-100 rounded-2xl">
                        <FaSearch className="text-white mr-3" />
                        <input
                            type="text"
                            className="flex-1 h-6 px-2 bg-white rounded-lg text-sm"
                            value={searchTerm}
                            placeholder="Search by event name..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">STATUS</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as "all" | "public" | "private")}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="all">All</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {/* Date Filters */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">Start Date:</label>
                        <input
                            type="date"
                            value={startDateFilter}
                            onChange={(e) => setStartDateFilter(e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">End Date:</label>
                        <input
                            type="date"
                            value={endDateFilter}
                            onChange={(e) => setEndDateFilter(e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Clear Filters Button */}
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Active Filters Indicator */}
                {(searchTerm || statusFilter !== "all" || startDateFilter || endDateFilter) && (
                    <div className="text-sm text-gray-600">
                        Showing {filteredEvents.length} of {events.length} events
                        {searchTerm && ` • Search: "${searchTerm}"`}
                        {statusFilter !== "all" && ` • Status: ${statusFilter}`}
                        {startDateFilter && ` • From: ${startDateFilter}`}
                        {endDateFilter && ` • To: ${endDateFilter}`}
                    </div>
                )}
            </div>

            {/* Data Table */}
            <DataTable
                className="h-[60%] overflow-visible"
                columns={columns}
                data={filteredEvents}
                onRowClicked={handleRowClick} // Add row click handler
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                fixedHeader
                highlightOnHover
                pointerOnHover={true} // Enable pointer cursor on hover
                noDataComponent={
                    <div className="py-8 text-center text-gray-500">
                        {events.length === 0 
                            ? "No public events available at this time." 
                            : "No events match your current filters."
                        }
                    </div>
                }
                customStyles={{
                    headCells: {
                        style: {
                            fontWeight: "bold",
                            backgroundColor: "#F5F5F5",
                            borderRadius: "0",
                            fontSize: "12px",
                            textTransform: "uppercase",
                        }
                    },
                    cells: {
                        style: {
                            fontSize: "14px",
                        }
                    },
                    rows: {
                        style: {
                            cursor: "pointer", // Add cursor pointer for rows
                        }
                    }
                }}
            />

            {/* Pagination Info */}
            <div className="p-4 text-sm text-gray-600 border-t">
                1-{Math.min(10, filteredEvents.length)} of {filteredEvents.length}
            </div>

            {/* Event Information Modal */}
            {selectedEvent && (
                <EventsInformationStaff
                    eventId={selectedEvent.id}
                    onClose={() => setSelectedEvent(null)}
                    action={true}
                />
            )}
        </div>
    );
};