import { IEventRequest } from "@/entities/IEventRequest"; 
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the eventRequest table.
 * This class extends GenericDAO with IEventRequest as T and number as K.
 * @author Erandi
 */
export class EventRequestDAO extends GenericDAO<"eventRequest", IEventRequest>
{
    /**
     * Create a new EventRequestDAO instance.
     */
    constructor() { super('eventRequest'); }
}