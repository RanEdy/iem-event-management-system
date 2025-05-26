import { UserLevel } from "@prisma/client";
import bcrypt from "bcryptjs";

export const users = [
    {
        level: UserLevel.MASTER,
        name: "Erandi Moreno",
        email: "erandisacbe@gmail.com",
        password: await bcrypt.hash("erandi12345", 10),

        birthday: new Date("23/07/2004"),
        hireDate: new Date("25/03/2025"),
        phone: "6861184628",
        active: true,
        guardCard: true,

        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,

        contactName: "Pepe",
        contactPhone: "6869236521",

    },
    {
        level: UserLevel.ADMIN,
        name: "Jose Angel Villagomez",
        email: "joseangel@gmail.com",
        password: await bcrypt.hash("jose12345", 10),

        birthday: new Date("10/12/2004"),
        hireDate: new Date("08/10/2022"),
        phone: "6865789012",
        active: true,
        guardCard: true,

        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,

        contactName: "Jose",
        contactPhone: "686745433",

    },
    {
        level: UserLevel.STAFF,
        name: "Xavier Ortiz",
        email: "xavierortiz@gmail.com",
        password: await bcrypt.hash("xavier12345", 10),

        birthday: new Date("12/02/1995"),
        hireDate: new Date("25/03/2025"),
        phone: "6861184628",
        active: true,
        guardCard: true,

        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,

        contactName: "Pepe",
        contactPhone: "6869236521",

    },
    {
        level: UserLevel.MASTER,
        name: "Luis Eduardo",
        email: "luis@gmail.com",
        password: await bcrypt.hash("luis4123", 10),

        birthday: new Date("04/08/2004"),
        hireDate: new Date("25/03/2025"),
        phone: "6861184628",
        active: true,
        guardCard: true,

        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,

        contactName: "Pepe",
        contactPhone: "6869236521",

    },
    {
        level: UserLevel.ADMIN,
        name: "Daniel Espinoza",
        email: "daniel@gmail.com",
        password: await bcrypt.hash("daniel54321", 10),

        birthday: new Date("08/04/1990"),
        hireDate: new Date("25/03/2025"),
        phone: "6861184628",
        active: true,
        guardCard: true,

        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,

        contactName: "Pepe",
        contactPhone: "6869236521",

    }
]