-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "wedding_status" AS ENUM ('scheduled', 'in_progress', 'postponed', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "time_zone" AS ENUM ('WIB', 'WITA', 'WIT');

-- CreateEnum
CREATE TYPE "media_owner" AS ENUM ('man', 'woman');

-- CreateEnum
CREATE TYPE "expired_status" AS ENUM ('ON_PROCESS', 'EXPIRED', 'ACTIVE', 'SUSPEND');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "phone_number" VARCHAR(13),
    "gender" "gender",
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role_id" BIGINT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" BIGSERIAL NOT NULL,
    "role_name" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_reception" (
    "id" BIGSERIAL NOT NULL,
    "title_reception" VARCHAR(50) NOT NULL,
    "name_man" VARCHAR(50) NOT NULL,
    "nickname_man" VARCHAR(50) NOT NULL,
    "prefix_man" VARCHAR(50) NOT NULL,
    "title_man" VARCHAR(50) NOT NULL,
    "birthdate_man" TIMESTAMP(3) NOT NULL,
    "father_man" VARCHAR(50) NOT NULL,
    "mother_man" VARCHAR(50) NOT NULL,
    "description_man" VARCHAR(255) NOT NULL,
    "prefix_woman" VARCHAR(50) NOT NULL,
    "name_woman" VARCHAR(50) NOT NULL,
    "nickname_woman" VARCHAR(50) NOT NULL,
    "title_woman" VARCHAR(50) NOT NULL,
    "birthdate_woman" TIMESTAMP(3) NOT NULL,
    "father_woman" VARCHAR(50) NOT NULL,
    "mother_woman" VARCHAR(50) NOT NULL,
    "description_woman" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "time_zone" "time_zone" NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "video_url" VARCHAR(255) NOT NULL,
    "user_id" BIGINT,
    "wedding_status" "wedding_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme_id" BIGINT NOT NULL,

    CONSTRAINT "wedding_reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_bank" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "bank" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wedding_reception_id" BIGINT NOT NULL,

    CONSTRAINT "account_bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_ceremony" (
    "id" BIGSERIAL NOT NULL,
    "title_ceremony" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wedding_reception_id" BIGINT NOT NULL,

    CONSTRAINT "wedding_ceremony_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme" (
    "id" BIGSERIAL NOT NULL,
    "theme_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_media" (
    "id" BIGSERIAL NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wedding_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bride_groom_media" (
    "id" BIGSERIAL NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "media_owner" "media_owner" NOT NULL,

    CONSTRAINT "bride_groom_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_type" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" BIGSERIAL NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "status_subscription" "expired_status" NOT NULL,
    "user_id" BIGINT NOT NULL,
    "subscription_type_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" BIGSERIAL NOT NULL,
    "payment_bank" VARCHAR(50) NOT NULL,
    "payment_amount" INTEGER NOT NULL,
    "payment_date" TIMESTAMP(3),
    "status_payment" "payment_status",
    "subscription_id" BIGINT,
    "payment_method_id" TEXT,
    "payment_request_id" TEXT,
    "virtual_account" TEXT,
    "limit_payment_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE INDEX "user_id_created_at_role_id_email_idx" ON "user"("id", "created_at", "role_id", "email");

-- CreateIndex
CREATE INDEX "role_id_created_at_idx" ON "role"("id", "created_at");

-- CreateIndex
CREATE INDEX "wedding_reception_id_user_id_created_at_idx" ON "wedding_reception"("id", "user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_ceremony_wedding_reception_id_key" ON "wedding_ceremony"("wedding_reception_id");

-- CreateIndex
CREATE INDEX "wedding_ceremony_id_created_at_idx" ON "wedding_ceremony"("id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "theme_theme_name_key" ON "theme"("theme_name");

-- CreateIndex
CREATE INDEX "theme_id_created_at_idx" ON "theme"("id", "created_at");

-- CreateIndex
CREATE INDEX "wedding_media_id_wedding_reception_id_created_at_idx" ON "wedding_media"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "bride_groom_media_id_wedding_reception_id_created_at_idx" ON "bride_groom_media"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "invitation_id_wedding_reception_id_created_at_idx" ON "invitation"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "subscription_type_id_created_at_idx" ON "subscription_type"("id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_user_id_key" ON "subscription"("user_id");

-- CreateIndex
CREATE INDEX "subscription_id_user_id_created_at_idx" ON "subscription"("id", "user_id", "created_at");

-- CreateIndex
CREATE INDEX "payment_id_subscription_id_created_at_idx" ON "payment"("id", "subscription_id", "created_at");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_bank" ADD CONSTRAINT "account_bank_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_ceremony" ADD CONSTRAINT "wedding_ceremony_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_media" ADD CONSTRAINT "wedding_media_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bride_groom_media" ADD CONSTRAINT "bride_groom_media_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscription_type_id_fkey" FOREIGN KEY ("subscription_type_id") REFERENCES "subscription_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
