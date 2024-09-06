import { PrismaClient } from "@prisma/client";

export default class ThemeService {
    private static prisma: PrismaClient = new PrismaClient();

    static async getThemeService() {
        const theme = await this.prisma.theme.findMany()
        return theme
    }

    static async getThemeByIdService(id: number) {
        const theme = await this.prisma.theme.findUnique({
            where: {
                id: id
            }
        })
        return theme
    }

    static async createThemeService(data: any) {
        const theme = await this.prisma.theme.create({
            data: data
        })
        return theme
    }

    static async updateThemeService(id: number, data: any) {
        const theme = await this.prisma.theme.update({
            where: {
                id: id
            },
            data: data
        })
        return theme
    }

    static async deleteThemeService(id: number) {
        const theme = await this.prisma.theme.delete({
            where: {
                id: id
            }
        })
        return theme
    }
}