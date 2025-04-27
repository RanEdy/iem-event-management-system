import { IEventUserList } from "@/entities/IEventUserList";
import { DAOLocator } from "@/persistence/DAOLocator";


/**
 * Class with methods for everything related to the EventUserList.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */
export class EventUserListService
{
    constructor() {}

    /**
     * Searches for a unique entry that matches with the id in the eventUserList table.
     * @param id The primary key of the eventUserList.
     * @returns A unique object of type eventUserList if found. Otherwise return null.
     */
    async findById(id: number): Promise<IEventUserList | null>
    {
        return DAOLocator.eventUserListDao.findById(id);
    }

    /**
     * Searches for all the entries of the eventUserList table.
     * @returns An array of eventUserList objects found in the table.
     */
    async findAll(): Promise<IEventUserList[]>
    {
        return DAOLocator.eventUserListDao.findAll();
    }

    /**
    * Creates a new eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's information, excluding the ID.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
    async create(eventUserListData: Omit<IEventUserList, 'id'>): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventUserListDao.create(eventUserListData);
            return true;
        }
        catch(error)
        {
            console.error("EventUserList could not be created");
            return false;
        }
    }

    /**
    * Updates an existing eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
    async update(eventUserListData: IEventUserList): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventUserListDao.update(eventUserListData);
            return true;
        }
        catch(error)
        {
            console.error("EventUserList could not be updated");
            return false;
        }
    }

    /**
    * Inserts or updates a eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(eventUserListData: IEventUserList): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventUserListDao.upsert(eventUserListData);
            return true;
        }
        catch(error)
        {
            console.error("EventUserList could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a eventUserList entry from the database by its ID.
    * @param id The primary key of the eventUserList to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventUserListDao.deleteById(id);
            return true;
        }
        catch(error)
        {
            console.error("EventUserList could not be deleted");
            return false;
        }
    }
}