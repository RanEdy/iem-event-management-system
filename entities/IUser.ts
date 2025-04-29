import { UserLevel } from "@/app/generated/prisma";

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

    contactName: string | null;
    contactPhone: string | null;

}