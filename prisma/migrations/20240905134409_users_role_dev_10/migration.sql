-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "phone_number" VARCHAR(13),
    "gender" "Gender",
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
    "title_man" VARCHAR(50) NOT NULL,
    "parent_man" VARCHAR(50) NOT NULL,
    "description_man" VARCHAR(255) NOT NULL,
    "name_woman" VARCHAR(50) NOT NULL,
    "title_woman" VARCHAR(50) NOT NULL,
    "parent_woman" VARCHAR(50) NOT NULL,
    "description_woman" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "user_id" BIGINT,
    "theme_id" BIGINT,
    "wedding_ceremony_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wedding_reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_ceremony" (
    "id" BIGSERIAL NOT NULL,
    "title_ceremony" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
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
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" BIGSERIAL NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "title_media" VARCHAR(50) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE INDEX "user_id_created_at_role_id_idx" ON "user"("id", "created_at", "role_id");

-- CreateIndex
CREATE INDEX "role_id_created_at_idx" ON "role"("id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_reception_wedding_ceremony_id_key" ON "wedding_reception"("wedding_ceremony_id");

-- CreateIndex
CREATE INDEX "wedding_reception_id_user_id_theme_id_created_at_idx" ON "wedding_reception"("id", "user_id", "theme_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_ceremony_wedding_reception_id_key" ON "wedding_ceremony"("wedding_reception_id");

-- CreateIndex
CREATE INDEX "wedding_ceremony_id_created_at_idx" ON "wedding_ceremony"("id", "created_at");

-- CreateIndex
CREATE INDEX "theme_id_created_at_idx" ON "theme"("id", "created_at");

-- CreateIndex
CREATE INDEX "media_id_created_at_idx" ON "media"("id", "created_at");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_ceremony" ADD CONSTRAINT "wedding_ceremony_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;
