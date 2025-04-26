import { IUser } from "@/entities/IUser";
import { GenericDAO } from "./GenericDAO";

export class UserDAO extends GenericDAO<IUser, number>
{
    constructor() { super('user'); }
}