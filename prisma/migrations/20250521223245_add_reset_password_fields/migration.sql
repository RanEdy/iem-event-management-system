-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetpasswordexpires" TIMESTAMP(3),
ADD COLUMN     "resetpasswordtoken" TEXT,
ALTER COLUMN "level" DROP DEFAULT,
ALTER COLUMN "active" SET DEFAULT true;
