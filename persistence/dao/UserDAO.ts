import { IUser } from "@/entities/IUser";
import { GenericDAO } from "./GenericDAO";
import { prisma } from "../lib/prisma"; // Asegúrate de importar prisma

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
        // Usa 'findUnique' si el email es único en tu esquema Prisma, sino 'findFirst'
        return this.getModel().findUnique({ where: { email } });
    }
}