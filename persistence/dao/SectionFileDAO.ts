import { ISectionFile } from "@/entities/ISectionFile";
import { GenericDAO } from "./GenericDAO";

class SectionFileDAO extends GenericDAO<'sectionFile', ISectionFile>
{
    constructor() { super('sectionFile') }
}