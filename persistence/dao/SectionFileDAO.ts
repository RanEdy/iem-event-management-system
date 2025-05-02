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

        return files.map(file => ({
            ...file,
            dataBytes: Buffer.from(file.dataBytes),
        }));
    }

    async create(fileData: Omit<ISectionFile, 'id'>): Promise<ISectionFile>
    {
        fileData.dataBytes = Buffer.from(fileData.dataBytes);
        return super.create(fileData);
    }

    async update(fileData: ISectionFile): Promise<ISectionFile>
    {
        fileData.dataBytes = Buffer.from(fileData.dataBytes);
        return super.update(fileData);
    }
}