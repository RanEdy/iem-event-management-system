import { IEventUserList } from "@/entities/IEventUserList";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the Event table.
 * This class extends GenericDAO with IUser as T and number as K.
 * @author Erandi Angel
 */
export class EventUserListDAO extends GenericDAO<"eventUserList", IEventUserList>
{
    /**
     * Create a new EventUserListDAO instance.
     */
    constructor() { super('eventUserList'); }

    
}