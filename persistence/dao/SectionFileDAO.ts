import { ISectionFile } from "@/entities/ISectionFile";
import { GenericDAO } from "./GenericDAO";

export class SectionFileDAO extends GenericDAO<'sectionFile', ISectionFile>
{
    constructor() { super('sectionFile') }
}