import { IEventUserList } from "./IEventUserList";
import { USAState } from "./USAState";
import { UserLevel } from "./UserLevel";

export interface IUser
{
    id: number;
    level: UserLevel;
    name: string;
    email: string;
    password: string;

    birthday: Date;
    hireDate: Date;
    phone: string;
    active: boolean;
    guardCard: boolean;

    supervisorCount: number;
    managerCount: number;
    logisticCount: number;
    driverCount: number;
    dispatchCount: number;
    assistantManagerCount: number;

    contactName: string;
    contactPhone: string;

    eventUserlist: IEventUserList[]

}