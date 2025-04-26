import { IEvent } from "./IEvent";
import { IUser } from "./IUser";
import { UserRole } from "./UserRole";

export interface IEventUserList 
{
    id: number;
    userId: number;
    eventId: number;
    role: UserRole;
    user: IUser;
    event: IEvent;
}