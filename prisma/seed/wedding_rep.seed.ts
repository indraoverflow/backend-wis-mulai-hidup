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
            start_time: "10:00",
            end_time: "11:00",
            time_zone: "WIB",
            location: "sakura",
            address: "sakura",
            description_man: "sakura",
            birthdate_man: new Date('1997-01-01'),
            birthdate_woman: new Date('2000-01-01'),
            description_woman: "sakura",
            prefix_man: "Mr.",
            name_man: "Andi Lukito",
            nickname_man: "Andi",
            title_man: "S.H.",
            father_man: "sakura",
            mother_man: "sakura",
            name_woman: "Anggi Kurnia",
            nickname_woman: "Anggi",
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
