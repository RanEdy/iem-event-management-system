import { IUser } from "@/entities/IUser";
import { DAOLocator } from "@/persistence/DAOLocator";
// Importa bcrypt si vas a usar hashing de contraseñas en el futuro
// import bcrypt from 'bcrypt';


/**
 * Class with methods for everything related to the user.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */
export class UserService
{
    constructor() {}

    /**
     * Finds a user by email and verifies the password.
     * @param email The user's email.
     * @param password The user's password.
     * @returns The user object if credentials are valid, otherwise null.
     */
    async verifyCredentials(email: string, password: string): Promise<IUser | null>
    {
        try
        {
            const user = await DAOLocator.userDao.findByEmail(email);

            if (!user) {
                console.log(`User not found with email: ${email}`);
                return null;
            }

            // Direct comparison of passwords (NOT SAFE FOR PRODUCTION!)
            // In a real environment, we should use hashing (e.g. bcrypt).
            //const isPasswordValid = await bcrypt.compare(password, user.password); 
            const isPasswordValid = user.password === password;

            if (!isPasswordValid) {
                console.log(`Invalid password for email: ${email}`);
                return null; // Incorrect password
            }

            console.log(`Credentials verified for email: ${email}`);
            return user; // Valid credentials
        }
        catch(error)
        {
            console.error("Error verifying credentials:", error);
            return null; // Error during verification
        }
    }

    /**
     * Searches for a unique entry that matches with the id in the user table.
     * @param id The primary key of the user.
     * @returns A unique object of type User if found. Otherwise return null.
     */
    async findById(id: number): Promise<IUser | null>
    {
        return DAOLocator.userDao.findById(id);
    }

    /**
     * Searches for all the entries of the user table.
     * @returns An array of user objects found in the table.
     */
    async findAll(): Promise<IUser[]>
    {
        return DAOLocator.userDao.findAll();
    }

    /**
    * Creates a new user entry in the database.
    * @param userData The object containing the user's information, excluding the ID.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
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

    /**
    * Updates an existing user entry in the database.
    * @param userData The object containing the user's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
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

    /**
    * Inserts or updates a user entry in the database.
    * @param userData The object containing the user's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
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

    /**
    * Deletes a user entry from the database by its ID.
    * @param id The primary key of the user to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
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