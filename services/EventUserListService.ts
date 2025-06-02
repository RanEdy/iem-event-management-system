import { IEventUserList } from "@/entities/IEventUserList";
import { DAOLocator } from "@/persistence/DAOLocator";
import { EventDAO } from "@/persistence/dao/EventDAO";
import { UserRole } from "@prisma/client";

/**
 * Class with methods for everything related to the EventUserList.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */
export class EventUserListService {
    constructor() { }

    /**
    * Returns all eventUserList entries that match the given user role.
    * @param role The role to filter the eventUserList entries.
    * @returns An array of IEventUserList objects matching the specified role. Returns an empty array if none match or an error occurs.
    */
    async findManyByRole(role: UserRole): Promise<IEventUserList[]> {
        let eventUserList: IEventUserList[] = [];
        try {
            const eventUserListAll = await DAOLocator.eventUserListDao.findAll();
            eventUserList = eventUserListAll.filter((data) => {
                if (data.role === role) {
                    return data;
                }
            })
        }
        catch (error) {
            console.error("Error find many by role:", error);
            return eventUserList;
        }
        return eventUserList;
    }

    /**
     * Searches for a unique entry that matches with the id in the eventUserList table.
     * @param id The primary key of the eventUserList.
     * @returns A unique object of type eventUserList if found. Otherwise return null.
     */
    async findById(id: number): Promise<IEventUserList | null> {
        return DAOLocator.eventUserListDao.findById(id);
    }

    /**
     * Searches for all the entries of the eventUserList table.
     * @returns An array of eventUserList objects found in the table.
     */
    async findAll(): Promise<IEventUserList[]> {
        return DAOLocator.eventUserListDao.findAll();
    }

    /**
    * Creates a new eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's information, excluding the ID.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
    async create(eventUserListData: Omit<IEventUserList, 'id'>): Promise<boolean> {
        try {
            await DAOLocator.eventUserListDao.create(eventUserListData);
            return true;
        }
        catch (error) {
            console.error("EventUserList could not be created");
            return false;
        }
    }

    /**
    * Updates an existing eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
    async update(eventUserListData: IEventUserList): Promise<boolean> {
        try {
            await DAOLocator.eventUserListDao.update(eventUserListData);
            return true;
        }
        catch (error) {
            console.error("EventUserList could not be updated");
            return false;
        }
    }

    /**
    * Inserts or updates a eventUserList entry in the database.
    * @param eventUserListData The object containing the eventUserList's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(eventUserListData: IEventUserList): Promise<boolean> {
        try {
            await DAOLocator.eventUserListDao.upsert(eventUserListData);
            return true;
        }
        catch (error) {
            console.error("EventUserList could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a eventUserList entry from the database by its ID.
    * @param id The primary key of the eventUserList to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean> {
        try {
            await DAOLocator.eventUserListDao.deleteById(id);
            return true;
        }
        catch (error) {
            console.error("EventUserList could not be deleted");
            return false;
        }
    }

    /**
     * Retrieves a single eventUserList entry from the database based on both userId and eventId.
     * @param userId The unique identifier of the user associated with the event.
     * @param eventId The unique identifier of the event associated with the user.
     * @returns An object of type IEventUserList if a matching entry is found; otherwise, returns null.
     */
    async findByUserAndEvent(userId: number, eventId: number): Promise<IEventUserList | null> {
        return DAOLocator.eventUserListDao.findByUserAndEvent(userId, eventId)
    }
}