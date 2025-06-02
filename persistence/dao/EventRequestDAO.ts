import { IEventRequest } from "@/entities/IEventRequest";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the eventRequest table.
 * This class extends GenericDAO with IEventRequest as T and number as K.
 * @author Erandi
 */
export class EventRequestDAO extends GenericDAO<"eventRequest", IEventRequest> {
    /**
     * Create a new EventRequestDAO instance.
     */
    constructor() { super('eventRequest'); }

    /**
     * Retrieves all event request entries associated with a specific user ID.
     * @param userId The unique identifier of the user whose event requests are being retrieved.
     * @returns An array of IEventRequest objects that match the given userId.
     */
    async findByUserId(userId: number): Promise<IEventRequest[]> {
        return this.getModel().findMany({
            where: { userId },
            include: {
                user: true,
                event: true,
            }
        });
    }

    async findByEvent(id: number): Promise<IEventRequest[]> {

        const requests = await this.getModel().findMany({
            where: {
                eventId: id
            },
        });

        return requests;
    }
}