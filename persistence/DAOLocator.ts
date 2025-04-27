import { UserDAO } from "./dao/UserDAO";
import { EventDAO } from "./dao/EventDAO";
import { EventUserListDAO } from "./dao/EventUserListDAO";

/**
 * This class is a locator for each DAO created in the project.
 * @author Erandi Angel
 */

export const DAOLocator = {
    /**
     * Create a new instance for each DAO in the project.
     */
    userDao: new UserDAO(),
    eventDao: new EventDAO(),
    eventUserList: new EventUserListDAO()
}