/*
  Warnings:

  - You are about to drop the column `dataBytes` on the `SectionFile` table. All the data in the column will be lost.
  - Added the required column `url` to the `SectionFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionFile" DROP COLUMN "dataBytes",
ADD COLUMN     "url" TEXT NOT NULL;
