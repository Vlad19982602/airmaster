/*
  Warnings:

  - You are about to drop the column `engineer_id` on the `WorkTime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkTime" DROP CONSTRAINT "WorkTime_engineer_id_fkey";

-- AlterTable
ALTER TABLE "WorkTime" DROP COLUMN "engineer_id",
ADD COLUMN     "contractor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "WorkTime" ADD CONSTRAINT "WorkTime_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
