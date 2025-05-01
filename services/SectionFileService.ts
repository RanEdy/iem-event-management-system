import { ISectionFile } from "@/entities/ISectionFile";
import { DAOLocator } from "@/persistence/DAOLocator";

export class SectionFileService {
    constructor() {}
    
        /**
         * Searches for a unique entry that matches with the id in the sectionFile table.
         * @param id The primary key of the sectionFile.
         * @returns A unique object of type sectionFile if found. Otherwise return null.
         */
        async findById(id: number): Promise<ISectionFile | null>
        {
            return DAOLocator.sectionFileDao.findById(id);
        }
    
        /**
         * Searches for all the entries of the sectionFileData table.
         * @returns An array of sectionFileData objects found in the table.
         */
        async findAll(): Promise<ISectionFile[]>
        {
            return DAOLocator.sectionFileDao.findAll();
        }
    
        /**
        * Creates a new sectionFileData entry in the database.
        * @param sectionFileData The object containing the sectionFileData's information, excluding the ID.
        * @returns A boolean, "true" if the creation was successful, otherwise "false".
        */
        async create(sectionFileData: Omit<ISectionFile, 'id, section'>): Promise<boolean>
        {
            try
            {
                await DAOLocator.sectionFileDao.create(sectionFileData);
                return true;
            }
            catch(error)
            {
                console.error("Section File could not be created");
                return false;
            }
        }
    
        /**
        * Updates an existing sectionFileData entry in the database.
        * @param sectionFileData The object containing the sectionFileData's updated information.
        * @returns A boolean, "true" if the update was successful, otherwise "false".
        */
        async update(sectionFileData: ISectionFile): Promise<boolean>
        {
            try
            {
                await DAOLocator.sectionFileDao.update(sectionFileData);
                return true;
            }
            catch(error)
            {
                console.error("Section File could not be updated");
                return false;
            }
        }
    
        /**
        * Inserts or updates a sectionFileData entry in the database.
        * @param eventSectionData The object containing the sectionFileData's information.
        * @returns A boolean, "true" if the operation was successful, otherwise "false".
        */
        async upsert(sectionFileData: ISectionFile): Promise<boolean>
        {
            try
            {
                await DAOLocator.sectionFileDao.upsert(sectionFileData);
                return true;
            }
            catch(error)
            {
                console.error("Section File could not be updated or created (upsert)");
                return false;
            }
        }
    
        /**
        * Deletes a sectionFileData entry from the database by its ID.
        * @param id The primary key of the sectionFileData to be deleted.
        * @returns A boolean, "true" if the deletion was successful, otherwise "false".
        */
        async deleteById(id: number): Promise<boolean>
        {
            try
            {
                await DAOLocator.sectionFileDao.deleteById(id);
                return true;
            }
            catch(error)
            {
                console.error("Section File could not be deleted");
                return false;
            }
        }
}