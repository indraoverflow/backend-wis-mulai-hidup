import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const theme = await prisma.theme.findFirst({
        where: {
            id: 1,
        }
    });

    await prisma.wedding_reception.create({
        data: {
            title_reception: "sakura",
            theme_id: theme?.id,
            start_date: new Date(),
            end_date: new Date(),
            location: "sakura",
            address: "sakura",
            description_man: "sakura",
            description_woman: "sakura",
            name_man: "sakura",
            title_man: "sakura",
            parent_man: "sakura",
            name_woman: "sakura",
            title_woman: "sakura",
            parent_woman: "sakura",
            user_id: 1,
            wedding_ceremony_id: 2,
            wedding_status: "scheduled",
        }
    });
    console.log("Wedding reception seed completed");
}

main()