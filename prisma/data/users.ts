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
        level: UserLevel.STAFF,
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
    
    }
]