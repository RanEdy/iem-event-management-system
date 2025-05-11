import { IEvent } from "@/entities/IEvent";
import { DAOLocator } from "@/persistence/DAOLocator";
import { EventStatus, USAState } from "@prisma/client";

/**
 * Class with methods for everything related to the event.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */

// Define an interface for the validation result
interface ValidationResult {
    isValid: boolean;
    error: string;
}

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
    async create(eventData: Omit<IEvent, 'id'>): Promise<boolean>
    {
        try
        {
            await DAOLocator.eventDao.create(eventData);
            return true;
        }
        catch(error)
        {
            console.error("Event could not be created");
            return false;
            
        }
    }

    /**
    * Updates an existing event entry in the database.
    * @param eventData The object containing the event's updated information.
    * @returns the event if the creation was successful, otherwise null.
    */
    async update(eventData: IEvent): Promise<boolean>
    {
        try
        {
             await DAOLocator.eventDao.update(eventData);
             return true;
        }
        catch(error)
        {
            console.error("Event could not be updated");
            return false;
        }
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

    async validateEventData(eventData: {
        name: string;
        city: string;
        state: USAState;
        zipCode: string;
        address: string;
        startDate: Date;
        endDate: Date;
        maxUsers: number;
    }): Promise<ValidationResult> {
        const { name, city, state, zipCode, address, startDate, endDate, maxUsers } = eventData;
        
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,'-]+$/;
        const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,'-]+$/;
        const zipCodeRegex = /^\d{5}(-\d{4})?$/;
        const today = new Date();

        if (!name?.trim()) return { isValid: false, error: "Event name cannot be empty" };
        if (!nameRegex.test(name)) return { isValid: false, error: "Event name contains invalid characters" };
        if (name.length > 60) return { isValid: false, error: "Event name cannot exceed 60 characters" };
        if (!city?.trim()) return { isValid: false, error: "City cannot be empty" };
        if (!cityRegex.test(city)) return { isValid: false, error: "City contains invalid characters" };
        if (city.length > 50) return { isValid: false, error: "City cannot exceed 40 characters" };
        if (!state) return { isValid: false, error: "State cannot be empty" };
        if (!zipCode?.trim()) return { isValid: false, error: "Zip code cannot be empty" };
        if (!zipCodeRegex.test(zipCode)) return { isValid: false, error: "Zip code is invalid" };
        if (!address?.trim()) return { isValid: false, error: "Address cannot be empty" };
        if (address.length > 200) return { isValid: false, error: "Address cannot exceed 200 characters" };
        if (!startDate) return { isValid: false, error: "Start date cannot be empty" };
        if (startDate < today) return { isValid: false, error: "Start date cannot be in the past" };
        if (!endDate) return { isValid: false, error: "End date cannot be empty" };
        if (endDate <= startDate) return { isValid: false, error: "End date must be after start date" };
        if (maxUsers <= 0) return { isValid: false, error: "Max users must be greater than 0" };
        if (maxUsers > 1000) return { isValid: false, error: "Max users cannot exceed 1000" };

        return { isValid: true, error: "" };
    }
}