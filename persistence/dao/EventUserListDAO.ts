import { IEventUserList } from "@/entities/IEventUserList";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the Event table.
 * This class extends GenericDAO with IUser as T and number as K.
 * @author Erandi Angel
 */
export class EventUserListDAO extends GenericDAO<"eventUserList", IEventUserList> {
    /**
     * Create a new EventUserListDAO instance.
     */
    constructor() { super('eventUserList'); }

    /**
     * Retrieves a single eventUserList entry based on both userId and eventId.
     * @param userId The unique identifier of the user associated with the event.
     * @param eventId The unique identifier of the event associated with the user.
     * @returns An object of type IEventUserList containing `id`, `userId`, `eventId`, and `role` if found; otherwise, returns null.
     */
    async findByUserAndEvent(userId: number, eventId: number): Promise<IEventUserList | null> {
        return this.getModel().findFirst({
            where: {
                userId,
                eventId
            },
            select: {
                id: true,
                userId: true,
                eventId: true,
                role: true
            }
        });
    }

}