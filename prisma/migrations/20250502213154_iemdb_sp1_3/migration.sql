-- DropForeignKey
ALTER TABLE "EventSection" DROP CONSTRAINT "EventSection_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventUserList" DROP CONSTRAINT "EventUserList_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventUserList" DROP CONSTRAINT "EventUserList_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionFile" DROP CONSTRAINT "SectionFile_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "EventSection" ADD CONSTRAINT "EventSection_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionFile" ADD CONSTRAINT "SectionFile_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EventSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserList" ADD CONSTRAINT "EventUserList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserList" ADD CONSTRAINT "EventUserList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
