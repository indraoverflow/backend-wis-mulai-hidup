import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function main() {

    await prisma.wedding_media.createMany({
        data: [
            {
                photo_url: "https://example.com/photo1.jpg",
                wedding_reception_id: 1,
            },
            {
                photo_url: "https://example.com/photo2.jpg",
                wedding_reception_id: 1,
            },
            {
                photo_url: "https://example.com/photo3.jpg",
                wedding_reception_id: 1,
            },
        ],
    });
    console.log("Media seed completed");
}

// main()

