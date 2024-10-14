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
}
