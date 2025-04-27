import { UserDAO } from "./dao/UserDAO";

export const DAOLocator = {
    userDao: new UserDAO(),
}