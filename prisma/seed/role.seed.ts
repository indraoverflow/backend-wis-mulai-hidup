import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function roleSeed() {
    await prisma.role.createMany({
        data: [
            {
                name: "admin"
            },
            {
                name: "user"
            }
        ]
    })
}

roleSeed()