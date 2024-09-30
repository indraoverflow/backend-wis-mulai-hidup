import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@gmail.com",
            password: "admin",
            role_id: 2,
        }
    });
    console.log("User seed completed");
}