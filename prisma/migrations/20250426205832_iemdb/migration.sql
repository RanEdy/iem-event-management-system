/*
  Warnings:

  - You are about to drop the column `address` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactName1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactName2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EventRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventShiftDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventShiftTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incident` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShiftRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `street` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventRequest" DROP CONSTRAINT "EventRequest_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventRequest" DROP CONSTRAINT "EventRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventShiftDay" DROP CONSTRAINT "EventShiftDay_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventShiftTime" DROP CONSTRAINT "EventShiftTime_shiftDayId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_shiftDayId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "address",
ADD COLUMN     "externalNumber" INTEGER,
ADD COLUMN     "internalNumber" INTEGER,
ADD COLUMN     "street" TEXT NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'CALIFORNIA';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "contactName1",
DROP COLUMN "contactName2",
DROP COLUMN "contactPhone1",
DROP COLUMN "contactPhone2",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT;

-- DropTable
DROP TABLE "EventRequest";

-- DropTable
DROP TABLE "EventShiftDay";

-- DropTable
DROP TABLE "EventShiftTime";

-- DropTable
DROP TABLE "Incident";

-- DropTable
DROP TABLE "ShiftRequest";
