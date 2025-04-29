/*
  Warnings:

  - You are about to drop the column `supervisotCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "supervisotCount",
ADD COLUMN     "supervisorCount" INTEGER NOT NULL DEFAULT 0;
