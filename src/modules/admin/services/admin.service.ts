import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { AdminType } from "../types/admin.type";

export default class AdminService {
    private static prisma: PrismaClient = new PrismaClient()

    static async loginAdminService(email: string, password: string) {
        const admin = await this.prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                name: true,
                gender: true,
                password: true,
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        })
        if (!admin || admin.role?.role_name !== "admin") throw { message: "Admin not found", status: 404 }
        const isMatch = await bcrypt.compare(password, admin.password as string)
        if (!isMatch) throw { message: "Password is incorrect", status: 400 }
        return {
            id: admin.id.toString(),
            email: admin.email,
            name: admin.name,
            role_name: admin.role?.role_name
        }
    }

    static async registerAdminService(body: AdminType) {
        const findAdmin = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (findAdmin) throw { message: "ADMIN_ALREADY_EXISTS", status: 400 }
        const role = await this.prisma.role.findFirst({
            where: {
                role_name: "admin"
            }
        })
        if (!role) throw { message: "ROLE_NOT_FOUND", status: 404 }
        const hashPassword = await bcrypt.hash(body.password, 10)
        body.password = hashPassword
        const admin = await this.prisma.user.create({
            data: {
                ...body,
                role_id: role?.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                gender: true,
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        })
        return {
            id: admin.id.toString(),
            email: admin.email,
            name: admin.name,
            role_name: admin.role?.role_name
        }
    }

    static async refreshTokenService(id: number, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user) throw { message: "USER_NOT_FOUND", status: 404 }
        await this.prisma.user.update({
            where: { id: id },
            data: { refresh_token: refreshToken }
        })
    }

    static async logoutAdminService(id: number) {
        await this.prisma.user.update({
            where: { id: id },
            data: { refresh_token: null }
        })
    }
}