import { IEventSection } from "@/entities/IEventSection";
import { DAOLocator } from "@/persistence/DAOLocator";

export class EventSectionService {
    constructor() { }

    async findByEvent(id: number): Promise <IEventSection[]> {
        return DAOLocator.eventSectionDao.findByEvent(id);
    }

    async findRecent(): Promise<IEventSection | null>
    {
        return DAOLocator.eventSectionDao.findFirst();
    }

    /**
     * Searches for a unique entry that matches with the id in the eventSection table.
     * @param id The primary key of the eventSection.
     * @returns A unique object of type eventSection if found. Otherwise return null.
     */
    async findById(id: number): Promise<IEventSection | null> {
        return DAOLocator.eventSectionDao.findById(id);
    }

    /**
     * Searches for all the entries of the eventSection table.
     * @returns An array of eventSection objects found in the table.
     */
    async findAll(): Promise<IEventSection[]> {
        return DAOLocator.eventSectionDao.findAll();
    }

    /**
    * Creates a new eventSection entry in the database.
    * @param eventSectionData The object containing the eventSection's information, excluding the ID.
    * @returns the event section if the creation was successful, otherwise null.
    */
    async create(eventSectionData: Omit<IEventSection, 'id'>): Promise<IEventSection | null> {
        let section: IEventSection | null = null;
        try {
            const { id, ...dataWithoutId } = eventSectionData as any;

            section = await DAOLocator.eventSectionDao.create(dataWithoutId);
            console.log("Section created: ");
            console.log(section);
        }
        catch (error) {
            console.error("Event Section could not be created:", error);
        }
        return section;
    }

    /**
    * Updates an existing eventSection entry in the database.
    * @param eventSectionData The object containing the eventSection's updated information.
    * @returns the event section if the creation was successful, otherwise null.
    */
    async update(eventSectionData: IEventSection): Promise<IEventSection | null> {
        let section: IEventSection | null = null;
        try {
            section = await DAOLocator.eventSectionDao.update(eventSectionData);
        }
        catch (error) {
            console.error("Event Section could not be updated");
        }
        return section;
    }

    /**
    * Inserts or updates a eventSection entry in the database.
    * @param eventSectionData The object containing the eventSection's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(eventSectionData: IEventSection): Promise<boolean> {
        try {
            await DAOLocator.eventSectionDao.upsert(eventSectionData);
            return true;
        }
        catch (error) {
            console.error("Event Section could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a eventSection entry from the database by its ID.
    * @param id The primary key of the eventSection to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean> {
        try {
            await DAOLocator.eventSectionDao.deleteById(id);
            return true;
        }
        catch (error) {
            console.error("Event Section could not be deleted");
            return false;
        }
    }
}