import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    await prisma.bride_groom_media.createMany({
        data: [
            {
                photo_url: "https://example.com/photo1.jpg",
                wedding_reception_id: 1,
								media_owner: "man",
            },
            {
                photo_url: "https://example.com/photo2.jpg",
                wedding_reception_id: 1,
								media_owner: "man",
            },
            {
                photo_url: "https://example.com/photo3.jpg",
                wedding_reception_id: 1,
								media_owner: "woman",
            },
            {
                photo_url: "https://example.com/photo3.jpg",
                wedding_reception_id: 1,
								media_owner: "woman",
            },
        ],
    });
    console.log("Bride and Groom seed completed");
}

// main()

