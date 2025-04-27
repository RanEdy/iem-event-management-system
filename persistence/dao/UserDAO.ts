import { IUser } from "@/entities/IUser";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the User table.
 * This class extends GenericDAO with IUser as T and number as K.
 * @author Erandi
 */
export class UserDAO extends GenericDAO<IUser, number>
{
    /**
     * Create a new UserDAO instance.
     */
    constructor() { super('user'); }
}