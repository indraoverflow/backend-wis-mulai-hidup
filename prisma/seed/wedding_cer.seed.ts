import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    const wedding_reception = await prisma.wedding_reception.findMany();
    await prisma.wedding_ceremony.create({
        data: {
            title_ceremony: "sakura",
            address: "sakura",
            location: "sakura",
            start_date: new Date(),
            end_date: new Date(),
            wedding_reception_id: wedding_reception[0].id,
        }
    });
    console.log("Wedding ceremony seed completed");
}