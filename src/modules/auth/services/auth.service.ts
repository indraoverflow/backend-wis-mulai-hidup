import { PrismaClient, Gender, Prisma } from "@prisma/client";
import { AuthType } from "../types/auth.types";
import bcrypt from "bcrypt";
import { Oauth2Client } from "../../../config/googleoauth";
import { google } from "googleapis";

export default class AuthService {
    private static prisma: PrismaClient = new PrismaClient();

    static async loginService(authtype: AuthType) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: authtype.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!user) throw { message: "NOT_FOUND", status: 404 };
        const isMatch = await bcrypt.compare(authtype.password, user.password as string);
        if (!isMatch) throw { message: "PASSWORD_NOT_MATCH", status: 400 }
        return {
            id: user.id.toString(),
            email: user.email,
            role: user.role.name
        };
    }

    static async registerService(data: AuthType) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    role: {
                        connect: { id: 2 }
                    },
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    gender: true,
                    role: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                role: user.role.name
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw {
                        message: "EMAIL_ALREADY_EXISTS",
                        status: 400
                    };
                }
            }
            throw {
                message: "INTERNAL_SERVER_ERROR",
                status: 500
            };
        }
    }

    static async refreshTokenService(id: string, token: string) {
        try {
            await this.prisma.user.update({
                where: {
                    id: BigInt(id)
                },
                data: {
                    refresh_token: token
                }
            })
        } catch (error) {
            throw {
                message: "BAD_REQUEST_UPDATE_REFRESH_TOKEN",
                status: 400
            };
        }
    }

    static async authGoogleService(code: string) {

        const { tokens } = await Oauth2Client.getToken(code as string)
        Oauth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: Oauth2Client })
        const userInfo = await oauth2.userinfo.get()

        if (!userInfo.data.email || !userInfo.data.name) throw { message: "BAD_REQUEST", status: 400 }

        const user = await this.prisma.user.findUnique({
            where: {
                email: userInfo.data.email
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!user) {
            const newUser = await this.prisma.user.create({
                data: {
                    email: userInfo.data.email,
                    name: userInfo.data.name,
                    role: {
                        connect: { id: 2 }
                    },
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            return {
                id: newUser.id.toString(),
                email: newUser.email,
                name: newUser.name,
                role: newUser.role.name
            }
        } else {
            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                role: user.role.name
            }
        }


    }
}