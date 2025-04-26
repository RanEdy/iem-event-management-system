import { EventSection } from "@/app/generated/prisma";
import { IEventUserList } from "./IEventUserList";
import { USAState } from "./USAState";

export interface IEvent 
{
    id: number;
    name: string;
    city: string;
    state: USAState;
    zipCode: string;
    street: string;
    internalNumber: number;
    externalNumber: number;

    startDate: Date;
    endDate: Date;
    public: boolean
    done: boolean

    eventUsers: IEventUserList[]
    sections: EventSection[]
}