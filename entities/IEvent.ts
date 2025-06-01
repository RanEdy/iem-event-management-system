import { EventStatus, USAState } from "@prisma/client";

export interface IEvent 
{
    pendingRequests: number;
    registeredUsers: number;
    description: string;
    id: number;
    name: string;
    city: string;
    state: USAState;
    zipCode: string;
    address: string;

    startDate: Date;
    endDate: Date;
    public: boolean;
    status: EventStatus;
    maxUsers: number;
}