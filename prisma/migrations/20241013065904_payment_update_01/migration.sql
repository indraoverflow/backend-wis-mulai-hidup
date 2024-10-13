-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "payment_method_id" TEXT,
ADD COLUMN     "payment_request_id" TEXT,
ADD COLUMN     "virtual_account" TEXT;
