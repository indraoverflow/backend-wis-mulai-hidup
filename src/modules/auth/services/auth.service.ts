import { PrismaClient, Prisma } from "@prisma/client";
import { AuthType } from "../types/auth.types";
import bcrypt from "bcrypt";
import { Oauth2Client } from "../../../config/googleoauth";
import { google } from "googleapis";
import { JwtPayload, jwtSign } from "../../../commons/utils/jwtutils";

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
                name: true,
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        });
        if (!user) throw { message: "USER_NOT_FOUND", status: 404 };
        const isMatch = await bcrypt.compare(authtype.password, user.password as string);
        if (!isMatch) throw { message: "PASSWORD_NOT_MATCH", status: 400 }
        return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role_name: user.role?.role_name
        }
    }

    static async registerService(data: AuthType): Promise<JwtPayload> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const role = await this.prisma.role.findFirst({
                where: {
                    role_name: "user"
                }
            })
            if (!role) throw { message: "INTERNAL_SERVER_ERROR", status: 500 };
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    role_id: role?.id,
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
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                role_name: user.role?.role_name
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const target = (error.meta?.target as string[])[0];
                    throw {
                        message: `${target.toUpperCase()}_ALREADY_EXISTS`,
                        status: 400
                    };
                }
            }
            throw {
                message: "INTERNAL_SERVER_ERROR",
                status: 500
            }
        }
    }

    static async logoutService(id: string) {
        await this.prisma.user.update({
            where: {
                id: BigInt(id)
            },
            data: {
                refresh_token: null
            }
        })
        return "Logout successfully"
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

    static async authGoogleService(code: string): Promise<JwtPayload> {

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
                        role_name: true
                    }
                }
            }
        })

        if (!user) {
            const role = await this.prisma.role.findFirst({
                where: {
                    role_name: "user"
                }
            })
            if (!role) throw { message: "INTERNAL_SERVER_ERROR", status: 500 };
            const newUser = await this.prisma.user.create({
                data: {
                    email: userInfo.data.email,
                    name: userInfo.data.name,
                    role_id: role?.id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: {
                        select: {
                            role_name: true
                        }
                    }
                }
            })
            return {
                id: newUser.id.toString(),
                email: newUser.email,
                name: newUser.name,
                role_name: newUser.role?.role_name
            }
        } else {
            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                role_name: user.role?.role_name
            }
        }
    }

    static async forgotPasswordService(data: AuthType) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email
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

        if (!user) throw { message: "NOT_FOUND", status: 404 };

        let payload = {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role_name: user.role?.role_name
        }
        const token = jwtSign(payload, "15m")
        return token
    }

    static async changePasswordService(email: string, data: AuthType) {

        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) throw { message: "NOT_FOUND", status: 404 };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        })

        return "Change password successfully"
    }
}