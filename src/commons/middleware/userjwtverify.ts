import { NextFunction, Request, Response } from "express";
import { JwtPayload, jwtVerify } from "../utils/jwtutils";
import { PrismaClient } from "@prisma/client";
import { JsonWebTokenError } from "jsonwebtoken";

export default class UserJwtVerify {
    private static prisma: PrismaClient = new PrismaClient()

    static async userVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {

        const token = req.headers.authorization?.split(" ")[1]
        
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwtVerify(token) as unknown as JwtPayload;

            if (!decoded.id || decoded.role_name !== "user") return res.status(401).json({ message: 'Unauthorized' });

            const user = await UserJwtVerify.prisma.user.findFirst({
                where: {
                    email: decoded.email
                }
            })
            req.headers['user_id'] = decoded.id;
            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            next()
        } catch (error) {
            console.log(error);
            
            if (error instanceof JsonWebTokenError) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'TOKEN_EXPIRED' });
                }
                return res.status(401).json({ message: 'TOKEN_INVALID' });
            }
            return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    static async adminVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {
        const token = req.headers.authorization?.split(" ")[1]
        const csrf_token = req.headers['X-XSRF-TOKEN']
        if (!token || !csrf_token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwtVerify(token) as JwtPayload;
            if (!decoded.id || decoded.role_name !== "admin") {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await UserJwtVerify.prisma.user.findFirst({
                where: {
                    email: decoded.email
                }
            })

            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            req.headers['user_id'] = decoded.id;
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'TOKEN_EXPIRED' });
                }
                return res.status(401).json({ message: 'TOKEN_INVALID' });
            }
            return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    static async forgotPasswordVerify
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) {

        const token = req.query.token as string
        const decoded = jwtVerify(token) as JwtPayload

        try {
            const user = await UserJwtVerify.prisma.user.findFirst({
                where: {
                    email: decoded.email
                }
            })

            if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' });

            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'TOKEN_EXPIRED' });
                }
                return res.status(401).json({ message: 'TOKEN_INVALID' });
            }
            return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    static async refreshTokenVerify(req: Request, res: Response, next: NextFunction) {
        const csrf_token = req.cookies["X-XSRF-token"]
        const refreshToken = req.cookies.refresh_token
        if (!refreshToken || csrf_token) return res.status(401).json({ message: 'Unauthorized' });
        try {
            const user = await UserJwtVerify.prisma.user.findFirst({
                where: {
                    refresh_token: refreshToken
                }
            })
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'TOKEN_EXPIRED' });
                }
                return res.status(401).json({ message: 'TOKEN_INVALID' });
            }
            return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

}
