import { IEvent } from "./IEvent";

export interface IEventSection {
    id: number;
    eventId: number;
    sectionName: string;
    description: string;
    event: IEvent;
}