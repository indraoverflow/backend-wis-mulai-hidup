/*
  Warnings:

  - The values [on_process,expired,active,suspend] on the enum `expired_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [pending,success,failed] on the enum `payment_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `payment_amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "expired_status_new" AS ENUM ('ON_PROCESS', 'EXPIRED', 'ACTIVE', 'SUSPEND');
ALTER TABLE "subscription" ALTER COLUMN "status_subscription" TYPE "expired_status_new" USING ("status_subscription"::text::"expired_status_new");
ALTER TYPE "expired_status" RENAME TO "expired_status_old";
ALTER TYPE "expired_status_new" RENAME TO "expired_status";
DROP TYPE "expired_status_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "payment_status_new" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
ALTER TABLE "payment" ALTER COLUMN "status_payment" TYPE "payment_status_new" USING ("status_payment"::text::"payment_status_new");
ALTER TYPE "payment_status" RENAME TO "payment_status_old";
ALTER TYPE "payment_status_new" RENAME TO "payment_status";
DROP TYPE "payment_status_old";
COMMIT;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "payment_amount" SET DATA TYPE INTEGER;
