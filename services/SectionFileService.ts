import { ISectionFile } from "@/entities/ISectionFile";
import { DAOLocator } from "@/persistence/DAOLocator";

export class SectionFileService {
    constructor() { }

    /**
     * Searches for a unique entry that matches with the id in the sectionFile table.
     * @param id The primary key of the sectionFile.
     * @returns A unique object of type sectionFile if found. Otherwise return null.
     */
    async findById(id: number): Promise<ISectionFile | null> {
        return DAOLocator.sectionFileDao.findById(id);
    }

    async findBySection(id: number): Promise<ISectionFile[]> {
        return DAOLocator.sectionFileDao.findBySection(id);
    }

    /**
     * Searches for all the entries of the sectionFileData table.
     * @returns An array of sectionFileData objects found in the table.
     */
    async findAll(): Promise<ISectionFile[]> {
        return DAOLocator.sectionFileDao.findAll();
    }

    /**
* Creates a new sectionFileData entry in the database.
* @param sectionFileData The object containing the sectionFileData's information, excluding the ID.
* @returns the file, if the creation was successful, otherwise null.
*/
    async create(sectionFileData: Omit<ISectionFile, 'id'>): Promise<ISectionFile | null> {

        let file: ISectionFile | null = null;
        try {
            // Validar datos antes de crear
            if (!sectionFileData.sectionId || !sectionFileData.name || !sectionFileData.url) {
                throw new Error("Missing required fields");
            }

            file = await DAOLocator.sectionFileDao.create(sectionFileData);
            console.log("File created successfully: ", {
                id: file?.id,
                name: file?.name,
                sectionId: file?.sectionId
            });
        }
        catch (error) {
            console.error("Section File could not be created: ", error);
            throw error; // Re-throw to let the route handler catch it
        }
        return file;
    }

    /**
    * Updates an existing sectionFileData entry in the database.
    * @param sectionFileData The object containing the sectionFileData's updated information.
    * @returns the file, if the creation was successful, otherwise null.
    */
    async update(sectionFileData: ISectionFile): Promise<ISectionFile | null> {
        let file: ISectionFile | null = null;
        try {
            file = await DAOLocator.sectionFileDao.update(sectionFileData);
        }
        catch (error) {
            console.error("Section File could not be updated");
        }
        return file;
    }

    /**
    * Inserts or updates a sectionFileData entry in the database.
    * @param eventSectionData The object containing the sectionFileData's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(sectionFileData: ISectionFile): Promise<boolean> {
        try {
            await DAOLocator.sectionFileDao.upsert(sectionFileData);
            return true;
        }
        catch (error) {
            console.error("Section File could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a sectionFileData entry from the database by its ID.
    * @param id The primary key of the sectionFileData to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean> {
        try {
            await DAOLocator.sectionFileDao.deleteById(id);
            return true;
        }
        catch (error) {
            console.error("Section File could not be deleted");
            return false;
        }
    }
}