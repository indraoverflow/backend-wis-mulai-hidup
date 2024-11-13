import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    await prisma.subscription_type.createMany({
        data: [
        {
            name: "basic",
            price: 150000
        },
        {
            name: "premium",
            price: 200000
        }]
    })

    
    console.log("Media subscription completed");
}