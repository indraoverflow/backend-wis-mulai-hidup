/*
  Warnings:

  - The `gender` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "expired_status" AS ENUM ('on_process', 'expired', 'active', 'suspend');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('pending', 'success', 'failed');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscription_id" BIGINT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "gender";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "subscription" (
    "id" BIGSERIAL NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "status_subscription" "expired_status" NOT NULL,
    "payment_id" BIGINT NOT NULL,
    "user_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" BIGSERIAL NOT NULL,
    "payment_method" VARCHAR(50) NOT NULL,
    "payment_amount" BIGINT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "status_payment" "payment_status",
    "subscription_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_user_id_key" ON "subscription"("user_id");

-- CreateIndex
CREATE INDEX "subscription_id_user_id_created_at_idx" ON "subscription"("id", "user_id", "created_at");

-- CreateIndex
CREATE INDEX "payment_id_subscription_id_created_at_idx" ON "payment"("id", "subscription_id", "created_at");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
