import { prisma } from "../lib/prisma";


/**
 * Class with generic methods for CRUD.
 * It uses the ORM of prisma for the database communication.
 * @param {T} T type of the entity (table).
 * @param {K} K type of the primary key of the entity.
 * @author Erandi
 */
export class GenericDAO<T, K>
{
    constructor(protected modelName: keyof typeof prisma) { }

    /**
     * Searches for a unique entry that matches with the id in the table of entity T.
     * @param id primary key of the entity.
     * @returns A unique object of type T if found. Otherwise return null.
     */
    async findById(id: K): Promise<T | null>
    {
        return prisma[this.modelName].findUnique({ where: { id } });
    }

    /**
     * Searches for all the entries of the table.
     * @returns An array of objects of type T found at the table.
     */
    async findAll(): Promise<T[]>
    {
        return prisma[this.modelName].findMany({});
    }

    /**
     * Creates a new entry in the table with the data provided.
     * @param data The data object provided. Note that the id gets omitted.
     * @returns The object that got created.
     */
    async create(data: Omit<T, 'id'>): Promise<T>
    {
        return prisma[this.modelName].create({ data });
    }

    /**
     * Updates the entry in the table that matches with the id provided in the data object.
     * @param data The data object provided.
     * @returns The object that got updated.
     */
    async update(data: T): Promise<T>
    {
        return prisma[this.modelName].update({
            where: { id: (data as any).id },
            data
        });
    }

    /**
     * Updates the entry in the table that matches with the id provided in the data object.
     * If not match was found, then it creates a new entry with the data provided.
     * @param data The data object provided.
     * @returns The object that got updated or created.
     */
    async upsert(data: T): Promise<T>
    {
        return prisma[this.modelName].upsert({
            where: { id: (data as any).id },
            update: data,
            create: data
        })
    }

    /**
     * Deletes an entry in the table that matches with the id provided.
     * @param id The primary key of the entity.
     * @returns The object that got deleted if found.
     */
    async deleteById(id: K): Promise<T>
    {
        return prisma[this.modelName].delete({ where: { id } });
    }
}