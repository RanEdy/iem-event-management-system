"use client";

import React, { useEffect, useState } from "react";
import { IEvent } from "@/entities/IEvent";
import RequestCard from "./RequestCard";
import { EventStatus } from '@prisma/client';

export const RequestStatus: React.FC = () => {

    const [events, setEvents] = useState<IEvent[]>([])

    const loadEvents = async () => {
        fetch("api/event")
            .then(res => res.json())
            .then((data: IEvent[]) => {
                // Cast string dates to Date objects and filter only events in process
                const parsedEvents = data
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
        loadEvents();
    }, []);

    // useEffect(() => {
    //     console.log("Cantidad de eventos: " + events.length);

    //     events.forEach(event => {
    //         console.log("-------------------------------");
    //         console.log("Event Name:", event.name);
    //         console.log("Start Date:", event.startDate);
    //     });

    // }, [events]);

    return (
        <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
            <div className="p-4 flex flex-col sm:flex-row justify-between lg:w-2/3 md:items-center md:w-[88%]">
                <div className="p-4 rounded text-center">Total applications: <span className="font-bold">{" " + events.length}</span></div>
                <div className="p-4 rounded text-center">Rejected applications: <span className="font-bold">{" " + events.filter(event => event.status === EventStatus.CANCELLED).length}</span></div>
                <div className="p-4 rounded text-center">Pending applications: <span className="font-bold">{" " + events.filter(event => event.status === EventStatus.IN_PROCESS).length}</span></div>
                <div className="p-4 rounded text-center">Accepted applications: <span className="font-bold">{" " + events.filter(event => event.status === EventStatus.DONE).length}</span></div>
            </div>

            <hr className="border-t-2 border-gray-300 w-[98%] mx-auto " />

            <div className="w-full h-auto grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                {/* Rejected Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Rejected Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {events
                            .filter(event => event.status === EventStatus.CANCELLED)
                            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                            .map(event => (
                                <RequestCard key={event.id} event={event} />
                            ))}
                    </div>
                </div>

                {/* Pending Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Pending Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {events
                            .filter(event => event.status === EventStatus.IN_PROCESS)
                            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                            .map(event => (
                                <RequestCard key={event.id} event={event} />
                            ))}
                    </div>
                </div>

                {/* Accepted Applications */}
                <div className="p-4 m-[20px]">
                    <div className="text-cyan-900 text-center text-1xl lg:text-2xl font-extrabold font-maven mb-7">
                        Accepted Applications
                    </div>
                    <div className="bg-bluedark-gradient-r py-0.5 rounded-lg h-[70%] overflow-y-auto">
                        {events
                            .filter(event => event.status === EventStatus.DONE)
                            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                            .map(event => (
                                <RequestCard key={event.id} event={event} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )

}