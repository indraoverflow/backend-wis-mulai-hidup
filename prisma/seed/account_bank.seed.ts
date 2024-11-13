import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    const account_bank = await prisma.account_bank.findMany();
    await prisma.account_bank.createMany({
        data: [
					{
						name: "Andi Lukito",
						number: "123456789",
						bank: "BCA",
						wedding_reception_id: 1
					},
					{
						name: "Anggi Kurnia",
						number: "1112222",
						bank: "BNI",
						wedding_reception_id: 1
					}
				]
    });
    console.log("Account bank seed completed");
}