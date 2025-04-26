-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERVISOR', 'MANAGER', 'LOGISTIC', 'DRIVER', 'DISPATCH', 'ASSISTANT_MANAGER');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('MASTER', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "GenericRequestStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "USAState" AS ENUM ('ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW_HAMPSHIRE', 'NEW_JERSEY', 'NEW_MEXICO', 'NEW_YORK', 'NORTH_CAROLINA', 'NORTH_DAKOTA', 'OHIO', 'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE_ISLAND', 'SOUTH_CAROLINA', 'SOUTH_DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST_VIRGINIA', 'WISCONSIN', 'WYOMING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "level" "UserLevel" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "USAState" NOT NULL,
    "zipCode" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "guardCard" BOOLEAN NOT NULL,
    "supervisotCount" INTEGER NOT NULL,
    "managerCount" INTEGER NOT NULL,
    "logisticCount" INTEGER NOT NULL,
    "driverCount" INTEGER NOT NULL,
    "dispatchCount" INTEGER NOT NULL,
    "assistantManagerCount" INTEGER NOT NULL,
    "contactName1" TEXT NOT NULL,
    "contactPhone1" TEXT NOT NULL,
    "contactName2" TEXT NOT NULL,
    "contactPhone2" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "USAState" NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRequest" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "GenericRequestStatus" NOT NULL,
    "isInvitation" BOOLEAN NOT NULL,

    CONSTRAINT "EventRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSection" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "sectionName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "EventSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionFile" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dataBytes" BYTEA NOT NULL,

    CONSTRAINT "SectionFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUserList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "EventUserList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventShiftTime" (
    "id" SERIAL NOT NULL,
    "shiftDayId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventShiftTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventShiftDay" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "maxUsers" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "EventShiftDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftRequest" (
    "id" SERIAL NOT NULL,
    "shiftDayId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "GenericRequestStatus" NOT NULL,

    CONSTRAINT "ShiftRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventRequest" ADD CONSTRAINT "EventRequest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRequest" ADD CONSTRAINT "EventRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSection" ADD CONSTRAINT "EventSection_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionFile" ADD CONSTRAINT "SectionFile_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EventSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserList" ADD CONSTRAINT "EventUserList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserList" ADD CONSTRAINT "EventUserList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventShiftTime" ADD CONSTRAINT "EventShiftTime_shiftDayId_fkey" FOREIGN KEY ("shiftDayId") REFERENCES "EventShiftDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventShiftDay" ADD CONSTRAINT "EventShiftDay_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftRequest" ADD CONSTRAINT "ShiftRequest_shiftDayId_fkey" FOREIGN KEY ("shiftDayId") REFERENCES "EventShiftDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftRequest" ADD CONSTRAINT "ShiftRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
