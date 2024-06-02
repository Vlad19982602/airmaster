/*
  Warnings:

  - You are about to drop the column `firstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `laborCost` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `materialCost` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `contractorId` on the `WorkTime` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `WorkTime` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `WorkTime` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labor_cost` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_cost` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_cost` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `WorkTime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_projectId_fkey";

-- DropForeignKey
ALTER TABLE "WorkTime" DROP CONSTRAINT "WorkTime_contractorId_fkey";

-- DropForeignKey
ALTER TABLE "WorkTime" DROP CONSTRAINT "WorkTime_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkTime" DROP CONSTRAINT "WorkTime_projectId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "projectId",
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "projectId",
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "clientId",
ADD COLUMN     "client_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "laborCost",
DROP COLUMN "materialCost",
DROP COLUMN "projectId",
DROP COLUMN "totalCost",
ADD COLUMN     "labor_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "material_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "project_id" INTEGER NOT NULL,
ADD COLUMN     "total_cost" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "WorkTime" DROP COLUMN "contractorId",
DROP COLUMN "employeeId",
DROP COLUMN "projectId",
ADD COLUMN     "employee_id" INTEGER,
ADD COLUMN     "engineer_id" INTEGER,
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTime" ADD CONSTRAINT "WorkTime_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTime" ADD CONSTRAINT "WorkTime_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTime" ADD CONSTRAINT "WorkTime_engineer_id_fkey" FOREIGN KEY ("engineer_id") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
