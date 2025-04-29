import { UserService } from "./UserService";
import { EventService } from "./EventService"; 
import { EventUserListService } from "./EventUserListService";

/**
 * This class is a locator for each service created within the services (business) layer of the project.
 * @author Erandi Angel
 */

export const ServiceLocator = {
    /**
     * Create a new instance for each Service in the project.
     */
    userService: new UserService(),
    eventService: new EventService(),
    eventUserListService: new EventUserListService()
}
