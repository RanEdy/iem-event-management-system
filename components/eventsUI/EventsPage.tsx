"use client";
import { EventsTable } from "./EventsTable"

export const EventsPage: React.FC = () =>
{
    return (
        <div className="flex h-full w-full p-12 justify-center items-center justify-self-center">
            <EventsTable/>
        </div>
    )
}