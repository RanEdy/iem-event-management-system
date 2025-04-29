import { USAState } from "@/app/generated/prisma";

export interface IEvent 
{
    id: number;
    name: string;
    city: string;
    state: USAState;
    zipCode: string;
    street: string;
    internalNumber: number | null;
    externalNumber: number | null;

    startDate: Date;
    endDate: Date;
    public: boolean;
    done: boolean;
    maxUsers: number;
}