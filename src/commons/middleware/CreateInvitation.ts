import { Request, Response, NextFunction } from "express";
import { JwtPayload, jwtVerify } from "../utils/jwtutils";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

export  class CreateInvitation {
    private static  prisma: PrismaClient = new PrismaClient()

    static async SubscriptionCheck(req: Request, res: Response, next: NextFunction) {

        const token = req.headers.authorization?.split(" ")[1]
        try {
            const decoded = jwtVerify(token!) as JwtPayload
            
            const subscription = await CreateInvitation.prisma.subscription.findFirst({
                where: {
                    user_id: Number(decoded.id)
                }
            })
            if(!subscription) throw new Error("SUBSCRIPTION_NOT_FOUND")
            if(subscription.status_subscription != "ACTIVE") throw new Error("SUBSCRIPTION_NOT_ACTIVE")
            if(moment(subscription.expired_at).isBefore(moment())){
                // update status subscription to expired
                await CreateInvitation.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: { status_subscription: "EXPIRED" }
                })
                throw {message: "SUBSCRIPTION_EXPIRED",status: 400}
            }
            next()
        } catch (error) {
            next(error)
        }
       
    }

}
