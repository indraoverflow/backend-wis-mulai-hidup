/*
  Warnings:

  - The values [on_process,expired,active,suspend,canceled] on the enum `wedding_status` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `wedding_status` on table `wedding_reception` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "wedding_status_new" AS ENUM ('scheduled', 'in_progress', 'postponed', 'completed', 'cancelled');
ALTER TABLE "wedding_reception" ALTER COLUMN "wedding_status" TYPE "wedding_status_new" USING ("wedding_status"::text::"wedding_status_new");
ALTER TYPE "wedding_status" RENAME TO "wedding_status_old";
ALTER TYPE "wedding_status_new" RENAME TO "wedding_status";
DROP TYPE "wedding_status_old";
COMMIT;

-- AlterTable
ALTER TABLE "wedding_reception" ALTER COLUMN "wedding_status" SET NOT NULL;
