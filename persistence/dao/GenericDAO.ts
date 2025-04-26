import { prisma } from "../lib/prisma";

export class GenericDAO<T, K>
{
    constructor(protected modelName: keyof typeof prisma) { }

    async findById(id: K): Promise<T | null>
    {
        return prisma[this.modelName].findUnique({ where: { id } });
    }

    async findAll(): Promise<T[]>
    {
        return prisma[this.modelName].findMany({});
    }

    async findFirst(id: K): Promise<T | null>
    {
        return prisma[this.modelName].findFirst({ where: {id } });
    }

    async create(data: Omit<T, 'id'>): Promise<T>
    {
        return prisma[this.modelName].create({ data });
    }

    async update(data: T): Promise<T | null>
    {
        return prisma[this.modelName].update({
            where: { id: (data as any).id },
            data
        });
    }

    async upsert(data: T): Promise<T | null>
    {
        return prisma[this.modelName].upsert({
            where: { id: (data as any).id },
            data
        })
    }

    async deleteById(id: K): Promise<T | null>
    {
        return prisma[this.modelName].delete({ where: { id } });
    }
}