import { IEvent } from "@/entities/IEvent";
import { DAOLocator } from "@/persistence/DAOLocator";


/**
 * Class with methods for everything related to the event.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */
export class EventService
{
    constructor() {}

    async findFirst(): Promise<IEvent | null> {
        return DAOLocator.eventDao.findFirst();
    }


    /**
     * Searches for a unique entry that matches with the id in the event table.
     * @param id The primary key of the event.
     * @returns A unique object of type event if found. Otherwise return null.
     */
    async findById(id: number): Promise<IEvent | null>
    {
        return DAOLocator.eventDao.findById(id);
    }

    /**
     * Searches for all the entries of the event table.
     * @returns An array of event objects found in the table.
     */
    async findAll(): Promise<IEvent[]>
    {
        return DAOLocator.eventDao.findAll();
    }

    /**
    * Creates a new event entry in the database.
    * @param eventData The object containing the event's information, excluding the ID.
    * @returns the event if the creation was successful, otherwise null.
    */
    async create(eventData: Omit<IEvent, 'id'>): Promise<IEvent | null>
    {
        let event: IEvent | null = null;
        try
        {
            event = await DAOLocator.eventDao.create(eventData);
        }
        catch(error)
        {
            console.error("Event could not be created");
        }
        return event;
    }

    /**
    * Updates an existing event entry in the database.
    * @param eventData The object containing the event's updated information.
    * @returns the event if the creation was successful, otherwise null.
    */
    async update(eventData: IEvent): Promise<IEvent | null>
    {
        let event: IEvent | null = null;
        try
        {
            event = await DAOLocator.eventDao.update(eventData);
        }
        catch(error)
        {
            console.error("Event could not be updated");
        }
        return event;
    }

    /**
    * Inserts or updates a event entry in the database.
    * @param eventData The object containing the event's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(eventData: IEvent): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventDao.upsert(eventData);
            return true;
        }
        catch(error)
        {
            console.error("Event could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a event entry from the database by its ID.
    * @param id The primary key of the event to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventDao.deleteById(id);
            return true;
        }
        catch(error)
        {
            console.error("Event could not be deleted");
            return false;
        }
    }
}