import { IEventSection } from "@/entities/IEventSection";
import { GenericDAO } from "./GenericDAO";

class EventSectionDAO extends GenericDAO<'eventSection', IEventSection>
{
    constructor() { super('eventSection') }
}