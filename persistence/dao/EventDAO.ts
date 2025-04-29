import { IEvent } from "@/entities/IEvent";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the Event table.
 * This class extends GenericDAO with IUser as T and number as K.
 * @author Erandi Angel
 */
export class EventDAO extends GenericDAO<"event", IEvent>
{
    /**
     * Create a new EventDAO instance.
     */
    constructor() { super('event'); }
}