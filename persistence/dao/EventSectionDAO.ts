import { IEventSection } from "@/entities/IEventSection";
import { GenericDAO } from "./GenericDAO";

export class EventSectionDAO extends GenericDAO<'eventSection', IEventSection>
{
    constructor() { super('eventSection') }

    async findFirst(): Promise <IEventSection | null>{

        const latest = await this.getModel().findFirst({
            orderBy: {
              id: 'desc',
            },
          });

        return latest;
    }

    async findByEvent(id: number): Promise <IEventSection[]> {

        const sections = await this.getModel().findMany({
            where: {
                eventId: id
            },
        });

        return sections;
    }
}