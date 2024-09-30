import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function roleSeed() {
    await prisma.role.createMany({
        data: [
            {
                role_name: "admin"
            },
            {
                role_name: "user"
            }
        ]
    })
    console.log("Role seed completed");
}
