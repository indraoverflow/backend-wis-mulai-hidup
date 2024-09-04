import { NextFunction, Request, Response } from "express";
import { JwtPayload, jwtVerify } from "../utils/jwtutils";
import { PrismaClient } from "@prisma/client";


export default class UserJwtVerify {
    private static prisma: PrismaClient = new PrismaClient()

    static async userVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwtVerify(token) as JwtPayload;
        if (!decoded.id || decoded.role !== "user") return res.status(401).json({ message: 'Unauthorized' });

        const user = await UserJwtVerify.prisma.user.findFirst({
            where: {
                email: decoded.email
            }
        })
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        next()

    }

    static async adminVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwtVerify(token) as JwtPayload;

        if (!decoded.id || decoded.role !== "admin") return res.status(401).json({ message: 'Unauthorized' });

        const user = await UserJwtVerify.prisma.user.findFirst({
            where: {
                email: decoded.email
            }
        })
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        next()
    }

    static async forgotPasswordVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {

        const token = req.query.token as string
        const decoded = jwtVerify(token) as JwtPayload

        const user = await UserJwtVerify.prisma.user.findFirst({
            where: {
                email: decoded.email
            }
        })

        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        next()

    }

    static async refreshTokenVerify(req: Request, res: Response, next: NextFunction) {

        const refreshToken = req.cookies.refresh_token
        if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

        const user = await UserJwtVerify.prisma.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        next()
    }
}
