import {Request,Response} from "express"
import AsyncHandler from "../../../commons/utils/asynhandler";
import { SubscribeService } from "../services/subscribe.service";
import { jwtVerify } from "../../../commons/utils/jwtutils";
import { JwtPayload } from "jsonwebtoken";



export class SubscribeController extends AsyncHandler{
    constructor(){
        super()
    }

    static getAllSubscribe = this.handleRequest(async(req:Request,res:Response)=>{
        const data = await SubscribeService.getAllSubscribe()
        return {
            message:"SUCCESS GET ALL SUBSCRIBE",
            data
        }
    })

    static getSubscribeByUser = this.handleRequest(async(req:Request,res:Response)=>{
        const token = req.cookies.access_token
        const decoded = jwtVerify(token) as JwtPayload
        const data = await SubscribeService.getSubscibeByUser(decoded.id)
        return {
            message:"SUCCESS GET SUBSCRIBE BY USER",
            data
        }
    })

    static createSubscribetype = this.handleRequest(async(req:Request,res:Response)=>{
        const {name,price} = req.body
        const data = await SubscribeService.createSubscribetype(name,price)
        return {
            status:201,
            message:"SUCCESS CREATE SUBSCRIBE TYPE",
            data
        }
    })

    static updateSubscribetype = this.handleRequest(async(req:Request,res:Response)=>{
        const {id} = req.params
        const {name,price} = req.body
        const data = await SubscribeService.updateSubscribetype(id,name,price)
        return {
            message:"SUCCESS UPDATE SUBSCRIBE TYPE",
            data
        }
    })
    
    static deleteSubscribetype = this.handleRequest(async(req:Request,res:Response)=>{
        const {id} = req.params
        const data = await SubscribeService.deleteSubscribetype(id)
        return {
            message:"SUCCESS DELETE SUBSCRIBE TYPE",
            data
        }
    })
    
    static getSubscribeType = this.handleRequest(async(req:Request,res:Response)=>{
        const data = await SubscribeService.getSubscribeType()
        return {
            message:"SUCCESS GET SUBSCRIBE TYPE",
            data
        }
    })
}
