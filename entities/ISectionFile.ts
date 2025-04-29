import { IEventSection } from "./IEventSection";

export interface ISectionFile {
    id: number;
    sectionId: number;
    name: string;
    dataBytes: Buffer;
    section: IEventSection;
}