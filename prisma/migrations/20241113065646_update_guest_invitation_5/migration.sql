/*
  Warnings:

  - You are about to drop the column `wedding_reception_id` on the `guest_invitation` table. All the data in the column will be lost.
  - Added the required column `wedding_unique_id` to the `guest_invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guest_invitation" DROP CONSTRAINT "guest_invitation_wedding_reception_id_fkey";

-- AlterTable
ALTER TABLE "guest_invitation" DROP COLUMN "wedding_reception_id",
ADD COLUMN     "wedding_unique_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "guest_invitation" ADD CONSTRAINT "guest_invitation_wedding_unique_id_fkey" FOREIGN KEY ("wedding_unique_id") REFERENCES "wedding_reception"("unique_id") ON DELETE CASCADE ON UPDATE CASCADE;
