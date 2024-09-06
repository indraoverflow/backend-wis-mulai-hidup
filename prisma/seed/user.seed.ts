import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@gmail.com",
            password: "admin",
            role_id: 2,
        }
    });
}

main()