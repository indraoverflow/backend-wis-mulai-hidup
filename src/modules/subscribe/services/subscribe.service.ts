import { PrismaClient } from "@prisma/client";


export class SubscribeService{
    private static prisma:PrismaClient = new PrismaClient()


    static async getAllSubscribe(){
        try {
            const data = await this.prisma.subscription.findMany({})
            return data
        } catch (error) {
            throw {message:"FAILED GET ALL SUBSCRIBE",error}            
        }
    }

    static async getSubscibeByUser(userId:string){
        try {
            const data = await this.prisma.subscription.findMany({
                where:{
                    user_id:+userId
                }
            })
            return data
        } catch (error) {
            throw {message:"FAILED GET SUBSCRIBE BY USER",error}            
        }
    }



}