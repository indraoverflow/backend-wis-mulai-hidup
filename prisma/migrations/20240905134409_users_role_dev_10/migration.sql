-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

CREATE TYPE "wedding_status" AS ENUM ('scheduled', 'on_process', 'expired', 'active', 'suspend', 'canceled');

CREATE TYPE "time_zone" AS ENUM ('WIB', 'WITA', 'WIT');

CREATE TYPE "media_owner" AS ENUM ('man', 'woman');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "phone_number" VARCHAR(13),
    "gender" "Gender",
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role_id" INT,

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
    "name_woman" VARCHAR(50) NOT NULL,
    "nickname_woman" VARCHAR(50) NOT NULL,
    "prefix_woman" VARCHAR(50) NOT NULL,
    "title_woman" VARCHAR(50) NOT NULL,
    "birthdate_woman" TIMESTAMP(3),
    "father_woman" VARCHAR(50) NOT NULL,
    "mother_woman" VARCHAR(50) NOT NULL,
    "description_woman" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" VARCHAR(50) NOT NULL,
    "end_time" VARCHAR(50) NOT NULL,
    "time_zone" "time_zone" NOT NULL,
    "wedding_status" "wedding_status",
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "user_id" BIGINT,
    "theme_id" BIGINT,
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
    "start_time" VARCHAR(50) NOT NULL,
    "end_time" VARCHAR(50) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wedding_reception_id" BIGINT NOT NULL,

    CONSTRAINT "wedding_ceremony_pkey" PRIMARY KEY ("id")
);


-- CreateTable
CREATE TABLE "account_bank" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "bank" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);
-- CREATE TABLE "wedding_reception_theme" (
--     "id" BIGSERIAL NOT NULL,
--     "wedding_reception_id" BIGINT,
--     "theme_id" BIGINT,
--     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMP(3) NOT NULL,

--     CONSTRAINT "wedding_reception_theme_pkey" PRIMARY KEY ("id")
-- );

-- CreateTable
CREATE TABLE "wedding_media" (
    "id" BIGSERIAL NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    -- "title_media" VARCHAR(50) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wedding_media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bride_groom_media" (
    "id" BIGSERIAL NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "media_owner" "media_owner" NOT NULL,

    CONSTRAINT "bride_groom_media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "invitation" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "wedding_reception_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "wedding_reception_id_user_id_theme_id_created_at_idx" ON "wedding_reception"("id", "user_id", "created_at", "theme_id");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_ceremony_wedding_reception_id_key" ON "wedding_ceremony"("wedding_reception_id");

-- CreateIndex
CREATE INDEX "wedding_ceremony_id_created_at_idx" ON "wedding_ceremony"("id", "created_at");

-- CreateIndex
CREATE INDEX "theme_id_created_at_idx" ON "theme"("id", "created_at");

-- CreateIndex

-- CREATE INDEX "wedding_reception_theme_wedding_reception_id_created_at_idx" ON "wedding_reception_theme"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "bride_groom_media_wedding_reception_id_created_at_idx" ON "bride_groom_media"("id", "wedding_reception_id", "created_at");

-- CreateIndex
CREATE INDEX "wedding_media_id_created_at_idx" ON "wedding_media"("id", "created_at");

-- CreateIndex
CREATE INDEX "invitation_id_created_at_idx" ON "invitation"("id", "created_at");
-- CreateIndex
CREATE INDEX "account_bank_id_created_at_idx" ON "account_bank"("id", "created_at");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "wedding_reception" ADD CONSTRAINT "wedding_reception_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- ALTER TABLE "wedding_reception_theme" ADD CONSTRAINT "wedding_reception_theme_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ALTER TABLE "wedding_reception_theme" ADD CONSTRAINT "wedding_reception_theme_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;


ALTER TABLE "bride_groom_media" ADD CONSTRAINT "bride_groom_media_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_ceremony" ADD CONSTRAINT "wedding_ceremony_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_media" ADD CONSTRAINT "wedding_media_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_bank" ADD CONSTRAINT "wedding_media_account_bank_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;
