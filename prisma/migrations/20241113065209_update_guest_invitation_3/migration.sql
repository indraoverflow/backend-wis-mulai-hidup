/*
  Warnings:

  - A unique constraint covering the columns `[unique_id]` on the table `wedding_reception` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_id` to the `wedding_reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "wedding_reception" ADD COLUMN  "unique_id" VARCHAR(50) NOT NULL;

-- CreateIndex
-- CREATE UNIQUE INDEX "wedding_reception_unique_id_key" ON "wedding_reception"("unique_id");
