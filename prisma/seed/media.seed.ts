import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.media.createMany({
        data: [
            {
                photo_url: "https://example.com/photo1.jpg",
                title_media: "Sakura",
                wedding_reception_id: 1,
            },
            {
                photo_url: "https://example.com/photo2.jpg",
                title_media: "Mizuki",
                wedding_reception_id: 1,
            },
            {
                photo_url: "https://example.com/photo3.jpg",
                title_media: "Takumi",
                wedding_reception_id: 1,
            },
        ],
    });
    console.log("Media seed completed");
}

main()

