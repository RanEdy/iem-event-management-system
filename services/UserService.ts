import { IUser } from "@/entities/IUser";
import { DAOLocator } from "@/persistence/DAOLocator";
// Import bcrypt if you are going to use password hashing in the future.
import bcrypt from 'bcrypt'; // <-- Uncomment or add this line


/**
 * Class with methods for everything related to the user.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */
export class UserService
{
    // Defines the number of salting rounds (cost factor).
    // A higher value is safer but slower. 10-12 is a good starting point.
    private saltRounds = 10;

    constructor() {}

    /**
     * Finds a user by email and verifies the password using bcrypt.
     * @param email The user's email.
     * @param password The plain text password to verify.
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

            // Compare the password provided with the stored hash
            const isPasswordValid = await bcrypt.compare(password, user.password);

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
            // Consider whether to return null or throw a specific error
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
    * Creates a new user entry in the database with a hashed password.
    * @param userData The object containing the user's information, excluding the ID.
    *                 The password should be plain text here.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
    async create(userData: Omit<IUser, 'id'>): Promise<boolean>
    {
        try
        {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);

            // Create user object with hashed password
            const userToCreate = {
                ...userData,
                password: hashedPassword
            };

            await DAOLocator.userDao.create(userToCreate);
            console.log(`User created successfully for email: ${userData.email}`);
            return true;
        }
        catch(error)
        {
            console.error("User could not be created:", error);
            return false;
        }
    }

    /**
    * Updates an existing user entry in the database.
    * IMPORTANT: If updating the password, ensure it's hashed first.
    * This example assumes the password in userData might already be hashed
    * or is not being updated. Add hashing logic if plain text password update is needed.
    * @param userData The object containing the user's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
    async update(userData: IUser): Promise<boolean>
    {
        try
        {
            // !! WARNING !!
            // If you allow password updates here, you MUST make sure you
            // that the password in `userData.password` is hashed BEFORE
            // to call this function, or add logic here to hash it
            // if it is detected to be a plaintext password.
            // For simplicity, this example assumes that the password is not updated.
            // or that it is already hashed.

            await DAOLocator.userDao.update(userData);
            console.log(`User updated successfully for ID: ${userData.id}`);
            return true;
        }
        catch(error)
        {
            console.error("User could not be updated:", error);
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