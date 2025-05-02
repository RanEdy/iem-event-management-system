"use client";
import { ArchivesTable } from "./ArchivesTable"

export const ArchivesPage: React.FC = () =>
{
    return (
        <div className="flex h-full w-full p-12 justify-center items-center justify-self-center">
            <ArchivesTable/>
        </div>
    )
}