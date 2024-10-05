/*
  Warnings:

  - You are about to drop the column `payment_id` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `user` table. All the data in the column will be lost.
  - Made the column `user_id` on table `subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_subscription_id_fkey";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "payment_id",
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "subscription_id";

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
