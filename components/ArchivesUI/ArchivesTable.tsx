"use client";

import { USAState } from "@prisma/client";
import { IEvent } from "@/entities/IEvent";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ContextMenuArchives from "../commonUI/ContexMenuArchives";

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
                    {row.externalNumber + " " + row.street + " #" + row.internalNumber}
                </div>
            </div>
        </div>,
    },
    {
        name: "DATE",
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
        name: "DURATION",
        selector: row => (row.endDate.getTime() - row.startDate.getTime()),
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
        selector: row => "34/50"
    },
    {
        name: "OPTIONS",
        cell: row => <ContextMenuArchives row={row}/>,
        ignoreRowClick: true,
    }
]


export const ArchivesTable: React.FC = () =>
{
    const [events, setEvents] = useState<IEvent[]>([])

    useEffect(() => {
        fetch("api/event")
        .then(res => res.json())
        .then((data: IEvent[]) => {
            // Convert date strings to Date objects and filter only completed events
            const parsedEvents = data
                .filter(event => event.done === true)
                .map(event => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
            setEvents(parsedEvents);
        })
        .catch(error => console.error("Error fetching or processing archived events:", error));
    }, []);
      
    const handleRowClick = (row: any) =>
    {
        console.log("Selected: ");
        console.log(row);
    }

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            <div className="p-4 flex flex-colum justify-between lg:w-1/2">
                <div>Total Archived Events: <span className="font-bold">{" " + events.length}</span></div>
                <div>Public Events: <span className="font-bold">{" " + events.filter((event) => {if (event.public) return event}).length}</span></div>
                <div>Private Events: <span className="font-bold">{" " + events.filter((event) => {if (!event.public) return event}).length}</span></div>
            </div>
            <hr/>

            <div className="flex flex-colum justify-between m-2">
                {/* SEARCH BAR */}
                <div className="flex flex-column min-w-56 lg:w-1/3 h-12 border-2 m-2 p-2 bg-bluedark-gradient-r border-zinc-100 rounded-2xl items-center">
                    <FaSearch className="text-white m-2 mr-3"/>
                    <input type="text" className="flex self-center w-full h-full p-1 bg-white rounded-xl" placeholder="Search archived events..."></input>
                </div>
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
            noDataComponent="No archived events available"
            customStyles={{headCells: {style: {fontWeight: "bold",backgroundColor: "#F5F5F5", borderRadius: "0"}}}}
            />
        </div>
    );
}