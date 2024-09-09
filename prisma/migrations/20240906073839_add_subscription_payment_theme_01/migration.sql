/*
  Warnings:

  - You are about to alter the column `payment_amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(10,2)`.
  - You are about to drop the column `name` on the `theme` table. All the data in the column will be lost.
  - Added the required column `theme_name` to the `theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "media_id_created_at_idx";

-- DropIndex
DROP INDEX "user_id_created_at_role_id_idx";

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "payment_amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "theme" DROP COLUMN "name",
ADD COLUMN     "theme_name" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE INDEX "media_id_wedding_reception_id_created_at_idx" ON "media"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "user_id_created_at_role_id_email_idx" ON "user"("id", "created_at", "role_id", "email");
