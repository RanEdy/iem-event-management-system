import { prisma } from "../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

//This type gets the all the prisma models that can be use with PrismaClient
type PrismaClientModelKeys = Extract<keyof PrismaClient, string>;

type ModelDelegate = {
  [K in PrismaClientModelKeys]: PrismaClient[K] extends {
    findUnique: (...args: any[]) => any;
  } ? K : never;
}[PrismaClientModelKeys];


//Then use a delegate to make a type based on the prisma model
type DelegateType<T extends ModelDelegate> = PrismaClient[T];

//Then use a delegate to make the same type but for the return value type
//This is to make the class generic with all the prisma model types, so Typescript can infer all the possibles types this class can be
type DelegateReturnType<T extends ModelDelegate> =
    DelegateType<T> extends {
        findUnique: (...args: any[]) => Prisma.PrismaPromise<infer R>;
    }
    ? R
    : never;
/**
 * Class with generic methods for CRUD.
 * It uses the ORM of prisma for the database communication.
 * @param {T} T name of the prisma model (table). Example 'user'.
 * @param {E} E type of the interface that represents the entity (table). By default uses prisma's own types. Example IUser.
 * @author Erandi
 */
export class GenericDAO<T extends ModelDelegate,  E = DelegateReturnType<T>>
{
    protected client: PrismaClient;

    constructor(private modelName: T) { 
        this.client = prisma;
    }

    protected getModel(): PrismaClient[T] {
        return this.client[this.modelName];
    }

    /**
     * Searches for a unique entry that matches with the id in the table of entity T.
     * @param id primary key of the entity.
     * @returns A unique object of type T if found. Otherwise return null.
     */
    async findById(id: number): Promise<E | null>
    {
        return (this.getModel() as any).findUnique({ where: { id } });
    }

    /**
     * Searches for all the entries of the table.
     * @returns An array of objects of type T found at the table.
     */
    async findAll(): Promise<E[]>
    {
        return (this.getModel() as any).findMany({});
    }

    /**
     * Creates a new entry in the table with the data provided.
     * @param data The data object provided. Note that the id gets omitted.
     * @returns The object that got created.
     */
    async create(data: Omit<E, 'id'>): Promise<E>
    {
        return (this.getModel() as any).create({ data });
    }

    /**
     * Updates the entry in the table that matches with the id provided in the data object.
     * @param data The data object provided.
     * @returns The object that got updated.
     */
    async update(data: E): Promise<E>
    {
        return (this.getModel() as any).update({
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
    async upsert(data: E): Promise<E>
    {
        return (this.getModel() as any).upsert({
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
    async deleteById(id: number): Promise<E>
    {
        return (this.getModel() as any).delete({ where: { id } });
    }
}