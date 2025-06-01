import { User } from "@prisma/client"; 
import { Event } from "@prisma/client";
import { GenericRequestStatus } from "@prisma/client"; 

export interface IEventRequest {
    id: number;
    eventId: number;
    userId: number;
    status: GenericRequestStatus;
    user: User;
    event: Event;
}