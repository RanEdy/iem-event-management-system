"use client";
import { UsersTable } from "./UsersTable"

export const UsersPage: React.FC = () =>
{
    return (
        <div className="flex h-full w-full p-12 justify-center items-center justify-self-center">
            <UsersTable/>
        </div>
    )
}