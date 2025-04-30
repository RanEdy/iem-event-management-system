import { IEventSection } from "@/entities/IEventSection";
import { GenericDAO } from "./GenericDAO";

export class EventSectionDAO extends GenericDAO<'eventSection', IEventSection>
{
    constructor() { super('eventSection') }
}