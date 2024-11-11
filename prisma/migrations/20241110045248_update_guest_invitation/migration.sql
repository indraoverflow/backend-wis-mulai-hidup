-- CreateEnum
CREATE TYPE "attendance_status" AS ENUM ('HADIR', 'TIDAK_HADIR', 'MUNGKIN_HADIR');

-- CreateTable
CREATE TABLE "guest_invitation" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(13) NOT NULL,
    "status" "attendance_status",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wedding_reception_id" BIGINT NOT NULL,

    CONSTRAINT "guest_invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guest_invitation" ADD CONSTRAINT "guest_invitation_wedding_reception_id_fkey" FOREIGN KEY ("wedding_reception_id") REFERENCES "wedding_reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- AddForeignKey
ALTER TABLE "guest_message" ADD CONSTRAINT "guest_message_guest_invitation_id_fkey" FOREIGN KEY ("guest_invitation_id") REFERENCES "guest_invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;