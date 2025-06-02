import { IEventRequest } from "@/entities/IEventRequest";
import { DAOLocator } from "@/persistence/DAOLocator";
import { IUser } from "@/entities/IUser";
import { ServiceLocator } from "./ServiceLocator";
import { GenericRequestStatus } from "@prisma/client";

/**
 * Class with methods for everything related to the eventRequest.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */

export class EventRequestService {

    constructor() { }

    /**
     * Searches for a unique entry that matches with the id in the eventRequest table.
     * @param id The primary key of the eventRequest.
     * @returns A unique object of type eventRequest if found. Otherwise return null.
     */
    async findById(id: number): Promise<IEventRequest | null> {
        return DAOLocator.eventRequestDAO.findById(id);
    }

    /**
     * Searches for all the entries of the eventRequest table.
     * @returns An array of eventRequest objects found in the table.
     */
    async findAll(): Promise<IEventRequest[]> {
        return DAOLocator.eventRequestDAO.findAll();
    }

    /**
    * Creates a new eventRequest entry in the database with a hashed password.
    * @param eventRequestData The object containing the eventRequest's information, excluding the ID.
    *                 The password should be plain text here.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
    async create(eventRequestData: Omit<IEventRequest, 'id'>): Promise<boolean> {
        try {
            await DAOLocator.eventRequestDAO.create(eventRequestData);
            return true;
        }
        catch (error) {
            console.error("eventRequest could not be created:", error);
            return false;
        }
    }

    /**
    * Updates an existing eventRequest entry in the database.
    * IMPORTANT: If updating the password, ensure it's hashed first.
    * This example assumes the password in eventRequestData might already be hashed
    * or is not being updated. Add hashing logic if plain text password update is needed.
    * @param eventRequestData The object containing the eventRequest's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
    async update(eventRequestData: IEventRequest): Promise<boolean> {
        try {
            // !! WARNING !!
            // If you allow password updates here, you MUST make sure you
            // that the password in `eventRequestData.password` is hashed BEFORE
            // to call this function, or add logic here to hash it
            // if it is detected to be a plaintext password.
            // For simplicity, this example assumes that the password is not updated.
            // or that it is already hashed.

            await DAOLocator.eventRequestDAO.update(eventRequestData);
            return true;
        }
        catch (error) {
            console.error("eventRequest could not be updated:", error);
            return false;
        }
    }

    /**
    * Inserts or updates a eventRequest entry in the database.
    * @param eventRequestData The object containing the eventRequest's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(eventRequestData: IEventRequest): Promise<boolean> {
        try {
            await DAOLocator.eventRequestDAO.upsert(eventRequestData);
            return true;
        }
        catch (error) {
            console.error("eventRequest could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a eventRequest entry from the database by its ID.
    * @param id The primary key of the eventRequest to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean> {
        try {
            await DAOLocator.eventRequestDAO.deleteById(id);
            return true;
        }
        catch (error) {
            console.error("eventRequest could not be deleted");
            return false;
        }
    }

    /**
     * Retrieves all eventRequest entries associated with a specific user ID.
     * @param userId The unique identifier of the user whose event requests are being retrieved.
     * @returns An array of IEventRequest objects corresponding to the user's requests.
     */
    async findByUserId(userId: number): Promise<IEventRequest[]> {
        return DAOLocator.eventRequestDAO.findByUserId(userId);
    }

    async findByEvent(eventId: number): Promise<IEventRequest[]>
    {
        try {
            return DAOLocator.eventRequestDAO.findByEvent(eventId);
        } catch (error) {
            console.log("Error while trying to get all requests from the event: " + eventId + ">> ", error)
        }
        return [];
    }

    async validateAccept(eventId: number, userId: number): Promise<string>
    {
        const event = await ServiceLocator.eventService.findById(eventId)
        //Event existance validation
        if (!event) return "Event does not exists"
        //User existance valdiation
        console.log(userId)
        const user = await ServiceLocator.userService.findById(userId)
        
        if (!user) return "User does not exists"
        //Request existance validation
        const request = (await ServiceLocator.eventRequestService.findAll()).filter(request => request.eventId === eventId && request.userId === userId)
        
        //Max capacity validation
        const totalUsers = await ServiceLocator.eventService.getTotalUsers(eventId);
        if (totalUsers >= (event?.maxUsers ?? Infinity)) return "Max Users capacity reached"

        //Employee Repetition validation
        const usersInEvent = (await ServiceLocator.eventUserListService.findAll()).filter(relation => relation.eventId === eventId)
        const repetition = usersInEvent.map(relation => {
            if (relation.userId === userId) return relation
        })
        if (repetition.length > 1) return "There is 1 or more users with the same id already in the event"
        
        //User active status validation
        if (!user.active) return "The user account is not active"

        //Event date conflicts validation

        return "";
    }

    async validateReject(eventId: number, userId: number): Promise<string>
    {
        const event = await ServiceLocator.eventService.findById(eventId)
        //Event existance validation
        if (!event) return "Event does not exists"
        //User existance valdiation
        const user = await ServiceLocator.userService.findById(userId)
        if (!user) return "User does not exists"
        //Request existance validation
        const request = (await ServiceLocator.eventRequestService.findAll()).filter(request => request.eventId === eventId && request.userId === userId)
        if (request.length != 1) return "Request does not exists"
        return "";
    }


    async findUsersByEvent(eventId: number): Promise<IUser[]> {
        let usersByEvent: IUser[] = [];
        try {
            //Filter all the request by the event id
            const requestsFromEvent = (await this.findByEvent(eventId))
                .filter(request => request.status === GenericRequestStatus.PENDING);

            const allUsers = await DAOLocator.userDao.findAll();

            // Filter all users with matching ids
            usersByEvent = allUsers.filter(user =>
                requestsFromEvent.some(request => request.userId === user.id)
            );
        }
        catch (error) {
            console.error("[115][EventRequestService][METHOD : findUsersByEvent] could not find users by the given event id")
        }
        return usersByEvent
    }
}