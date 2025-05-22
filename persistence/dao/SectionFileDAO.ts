import { ISectionFile } from "@/entities/ISectionFile";
import { GenericDAO } from "./GenericDAO";

export class SectionFileDAO extends GenericDAO<'sectionFile', ISectionFile>
{
    constructor() { super('sectionFile') }

    
    async findBySection(id: number): Promise<ISectionFile[]> {

        const files = await this.getModel().findMany({
            where: {
                sectionId: id
            },
        });

        return files;
    }

        async create(fileData: Omit<ISectionFile, 'id'>): Promise<ISectionFile>
    {
        try {

            const result = await super.create(fileData);
            return result;
        } catch (error) {
            console.error("Error creating section file:", error);
            throw error;
        }
    }

    async update(fileData: ISectionFile): Promise<ISectionFile>
    {
        return super.update(fileData);
    }

    async upsert(fileData: ISectionFile): Promise<ISectionFile>
    {
        try {
            
            const result = await super.upsert(fileData);
            return result;
        } catch (error) {
            console.error("Error upserting section file:", error);
            throw error;
        }
    }
}