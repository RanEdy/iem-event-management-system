import { IUser } from "@/entities/IUser";
import { DAOLocator } from "@/persistence/DAOLocator";

export class UserService
{
    constructor() {}

    async findById(id: number): Promise<IUser | null>
    {
        return DAOLocator.userDao.findById(id);
    }

    async findAll(): Promise<IUser[]>
    {
        return DAOLocator.userDao.findAll();
    }

    async create(userData: Omit<IUser, 'id'>): Promise<boolean>
    {
        try
        {
            await DAOLocator.userDao.create(userData);
            return true;
        }
        catch(error)
        {
            console.error("User could not be created");
            return false;
        }
    }

    async update(userData: IUser): Promise<boolean>
    {
        try
        {
            await DAOLocator.userDao.update(userData);
            return true;
        }
        catch(error)
        {
            console.error("User could not be updated");
            return false;
        }
    }

    async upsert(userData: IUser): Promise<boolean>
    {
        try
        {
            await DAOLocator.userDao.upsert(userData);
            return true;
        }
        catch(error)
        {
            console.error("User could not be updated or created (upsert)");
            return false;
        }
    }

    async deleteById(id: number): Promise<boolean>
    {
        try
        {
            await DAOLocator.userDao.deleteById(id);
            return true;
        }
        catch(error)
        {
            console.error("User could not be deleted");
            return false;
        }
    }
}