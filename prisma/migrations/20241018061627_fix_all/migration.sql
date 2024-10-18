/*
  Warnings:

  - Added the required column `subscription_type_id` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "subscription_type_id" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "subscription_type" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "subscription_type_id_created_at_idx" ON "subscription_type"("id", "created_at");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscription_type_id_fkey" FOREIGN KEY ("subscription_type_id") REFERENCES "subscription_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
