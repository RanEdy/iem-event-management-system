/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "public" SET DEFAULT false,
ALTER COLUMN "done" SET DEFAULT false;

-- AlterTable
ALTER TABLE "EventRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "isInvitation" SET DEFAULT false;

-- AlterTable
ALTER TABLE "EventSection" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ShiftRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "level" SET DEFAULT 'STAFF',
ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "guardCard" SET DEFAULT false,
ALTER COLUMN "supervisotCount" SET DEFAULT 0,
ALTER COLUMN "managerCount" SET DEFAULT 0,
ALTER COLUMN "logisticCount" SET DEFAULT 0,
ALTER COLUMN "driverCount" SET DEFAULT 0,
ALTER COLUMN "dispatchCount" SET DEFAULT 0,
ALTER COLUMN "assistantManagerCount" SET DEFAULT 0,
ALTER COLUMN "contactName1" DROP NOT NULL,
ALTER COLUMN "contactPhone1" DROP NOT NULL,
ALTER COLUMN "contactName2" DROP NOT NULL,
ALTER COLUMN "contactPhone2" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
