import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    const theme = await prisma.theme.findFirst({
        where: {
            id: 1,
        }
    });

    await prisma.wedding_reception.create({
        data: {
            title_reception: "sakura",
            start_date: new Date(),
            end_date: new Date(),
            time: "10:00",
            time_zone: "WIB",
            location: "sakura",
            address: "sakura",
            description_man: "sakura",
            description_woman: "sakura",
            prefix_man: "Mr.",
            name_man: "sakura",
            title_man: "S.H.",
            father_man: "sakura",
            mother_man: "sakura",
            name_woman: "sakura",
            prefix_woman: "Mrs",
            title_woman: "S.E.",
            father_woman: "sakura",
            mother_woman: "sakura",
            user_id: 1,
            theme_id: 1,
            wedding_status: "scheduled",
        }
    });
    console.log("Wedding reception seed completed");
}
