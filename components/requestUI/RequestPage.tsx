"use client";

import { RequestStatus } from "./RequestStatus"

export const RequestPage: React.FC = () =>
{
    return (
        <div className="flex h-full w-full p-12 justify-center items-center justify-self-center">
            <RequestStatus/>
        </div>
    )
}