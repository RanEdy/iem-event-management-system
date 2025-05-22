import { IUser } from "@/entities/IUser";
import { GenericDAO } from "./GenericDAO";

/**
 * Class with CRUD and query specific methods for the User table.
 * This class extends GenericDAO with IUser as T and number as K.
 * @author Erandi
 */
export class UserDAO extends GenericDAO<"user", IUser>
{
    /**
     * Create a new UserDAO instance.
     */
    constructor() { super('user'); }

    /**
     * Searches for a unique user entry by email.
     * @param email The email of the user.
     * @returns A unique object of type User if found. Otherwise return null.
     */
    async findByEmail(email: string): Promise<IUser | null>
    {
        return this.getModel().findUnique({ where: { email } });
    }

    public async update(userData: IUser): Promise<IUser> {
        // Extrae el 'id' y el resto de los datos para la actualización.
        const { id, ...dataToUpdate } = userData;
        try {
            await this.getModel().update({
                where: { id: id }, // 'id' se usa solo en la cláusula 'where'
                data: dataToUpdate, // 'dataToUpdate' no contiene 'id'
            });
            return userData;
        } catch (error) {
            console.error(`UserDAO: Error updating user with id ${id}:`, error);
            // Consider relanzar el error o manejarlo específicamente
            throw error;
        }
    }
}