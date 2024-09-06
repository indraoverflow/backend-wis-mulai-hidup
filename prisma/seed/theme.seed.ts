import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.theme.createMany({
        data: [
            {
                name: "sakura",
            },
            {
                name: "mizuki",
            },
            {
                name: "takumi",
            },
        ],
    });
    console.log("Theme seed completed");
}

main()

