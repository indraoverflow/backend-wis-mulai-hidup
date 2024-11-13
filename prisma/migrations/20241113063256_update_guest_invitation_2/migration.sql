/*
  Warnings:

  - A unique constraint covering the columns `[unique_id]` on the table `guest_invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_id` to the `guest_invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guest_invitation" ADD COLUMN     "unique_id" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "guest_invitation_unique_id_key" ON "guest_invitation"("unique_id");
