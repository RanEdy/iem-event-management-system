/*
  Warnings:

  - You are about to drop the column `done` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('IN_PROCESS', 'DONE', 'CANCELLED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "done",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'IN_PROCESS';
