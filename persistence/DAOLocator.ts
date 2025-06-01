import { UserDAO } from "./dao/UserDAO";
import { EventDAO } from "./dao/EventDAO";
import { EventUserListDAO } from "./dao/EventUserListDAO";
import { EventSectionDAO } from "./dao/EventSectionDAO";
import { SectionFileDAO } from "./dao/SectionFileDAO";
import { EventRequestDAO } from "./dao/EventRequestDAO";

/**
 * This class is a locator for each DAO created within the persistence layer of the project.
 * @author Erandi Angel
 */

export const DAOLocator = {
    /**
     * Create a new instance for each DAO in the project.
     */
    userDao: new UserDAO(),
    eventDao: new EventDAO(),
    eventUserListDao: new EventUserListDAO(),
    eventSectionDao: new EventSectionDAO(),
    sectionFileDao: new SectionFileDAO(),
    eventRequestDAO: new EventRequestDAO()
}