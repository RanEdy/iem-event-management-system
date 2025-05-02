import { IEvent } from "./IEvent";
import { IUser } from "./IUser";
import { UserRole } from "@prisma/client";

export interface IEventUserList 
{
    id: number;
    userId: number;
    eventId: number;
    role: UserRole;
}