/*
  Warnings:

  - The values [HADIR,TIDAK_HADIR] on the enum `attendance_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "attendance_status_new" AS ENUM ('YES', 'NO');
ALTER TABLE "guest_invitation" ALTER COLUMN "status" TYPE "attendance_status_new" USING ("status"::text::"attendance_status_new");
ALTER TYPE "attendance_status" RENAME TO "attendance_status_old";
ALTER TYPE "attendance_status_new" RENAME TO "attendance_status";
DROP TYPE "attendance_status_old";
COMMIT;
