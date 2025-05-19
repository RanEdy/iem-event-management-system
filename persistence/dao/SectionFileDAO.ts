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
        try {
            // Validate dataBytes Buffer
            if (!Buffer.isBuffer(fileData.dataBytes)) {
                if (Array.isArray(fileData.dataBytes)) {
                    fileData.dataBytes = Buffer.from(fileData.dataBytes);
                } else if (typeof fileData.dataBytes === 'string') {
                    fileData.dataBytes = Buffer.from(fileData.dataBytes, 'base64');
                } else {
                    throw new Error("Invalid dataBytes format for create operation");
                }
            }

            const result = await super.create(fileData);
            return {
                ...result,
                dataBytes: Buffer.from(result.dataBytes)
            };
        } catch (error) {
            console.error("Error creating section file:", error);
            throw error;
        }
    }

    async update(fileData: ISectionFile): Promise<ISectionFile>
    {
        fileData.dataBytes = Buffer.from(fileData.dataBytes);
        return super.update(fileData);
    }

    async upsert(fileData: ISectionFile): Promise<ISectionFile>
    {
        try {
            // Validate dataBytes Buffer
            if (!Buffer.isBuffer(fileData.dataBytes)) {
                if (Array.isArray(fileData.dataBytes)) {
                    fileData.dataBytes = Buffer.from(fileData.dataBytes);
                } else if (typeof fileData.dataBytes === 'string') {
                    fileData.dataBytes = Buffer.from(fileData.dataBytes, 'base64');
                } else {
                    fileData.dataBytes = Buffer.from(Object.values(fileData.dataBytes as any));
                }
            }

            const result = await super.upsert(fileData);
            return {
                ...result,
                dataBytes: Buffer.from(result.dataBytes)
            };
        } catch (error) {
            console.error("Error upserting section file:", error);
            throw error;
        }
    }
}