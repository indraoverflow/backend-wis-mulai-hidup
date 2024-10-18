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

    static async getSubscribeType(){
        try {
            const data = await this.prisma.subscription_type.findMany({})
            return data
        } catch (error) {
            throw {message:"FAILED GET SUBSCRIBE TYPE",error}            
        }
    }

    static async createSubscribetype(name:string,price:number){
        try {
            const data = await this.prisma.subscription_type.create({
                data:{
                    name,
                    price
                }
            })
            return data
        } catch (error) {
            throw {message:"FAILED CREATE SUBSCRIBE TYPE",error}
        }
    }

    static async updateSubscribetype(id:string,name:string,price:number){
        try {
            const data = await this.prisma.subscription_type.update({
                where:{
                    id:+id
                },
                data:{
                    name,
                    price
                }
            })
            return data
        } catch (error) {
            throw {message:"FAILED UPDATE SUBSCRIBE TYPE",error}
        }
    }

    static async deleteSubscribetype(id:string){
        try {
            const data = await this.prisma.subscription_type.delete({
                where:{
                    id:+id
                }
            })
            return data
        } catch (error) {
            throw {message:"FAILED DELETE SUBSCRIBE TYPE",error}
        }
    }
            
}