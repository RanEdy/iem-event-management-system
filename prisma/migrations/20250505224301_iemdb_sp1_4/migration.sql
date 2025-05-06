/*
  Warnings:

  - You are about to drop the column `externalNumber` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `internalNumber` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Event` table. All the data in the column will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "externalNumber",
DROP COLUMN "internalNumber",
DROP COLUMN "street",
ADD COLUMN     "address" TEXT NOT NULL;
