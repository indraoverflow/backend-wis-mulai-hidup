import { PrismaClient } from "@prisma/client";

export default class UserService {
    private static prisma: PrismaClient = new PrismaClient();

    static async getUserService() {
        const user = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                gender: true,
                phone_number: true,
                password: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return user
    }

    static async getUseridService(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    }

    static async updateUserService(id: number, body: any) {
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: body,
            select: {
                id: true,
                email: true,
                name: true,
                gender: true,
                phone_number: true,
                role: {
                    select: { name: true }
                }
            }
        })
        return user
    }

    static async deleteUserService(id: number) {
        const user = await this.prisma.user.delete({
            where: {
                id: id
            }
        })
        return user
    }
}