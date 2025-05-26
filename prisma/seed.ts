import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { plainUsers } from "./data/users";
import { events } from "./data/events";
import { eventSections } from "./data/eventSections";

const prisma = new PrismaClient();

async function main() {
  // Hashear contraseñas
  const users = await Promise.all(
    plainUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  // Borrar datos anteriores si lo deseas
  await prisma.eventSection.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Insertar datos
  await prisma.user.createMany({ data: users });
  await prisma.event.createMany({ data: events });
  await prisma.eventSection.createMany({ data: eventSections });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
