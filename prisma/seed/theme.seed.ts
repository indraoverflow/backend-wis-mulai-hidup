import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.theme.createMany({
        data: [
            {
                theme_name: "sakura",
            },
            {
                theme_name: "mizuki",
            },
            {
                theme_name: "takumi",
            },
        ],
    });
    console.log("Theme seed completed");
}

main()

