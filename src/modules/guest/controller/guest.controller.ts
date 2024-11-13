import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import GuestInvitation from "../services/guest.service";

export default class GuestController extends AsyncHandler {
    constructor() {
        super()
    }
    
    static CreateGuest = this.handleRequest(async (req: Request, res: Response) => {
        const guest = await GuestInvitation.CreateGuestInvitation(req.body);
        return {
            message: "SUCCESS_CREATE_GUEST",
            data : guest,
            status:201
        }
    })

    static GetAllGuest = this.handleRequest(async(req:Request,res:Response)=>{
        const { unique_id } = req.params
        const result = await GuestInvitation.GetAllGuestInvitations(unique_id);
        const guest = result.map((data)=>{
            return {
                ...data,
                share_link : `${req.protocol}://${req.get("host")}/guest?to=${data.unique_id}`
            }
        })
        return {
            message:"SUCCESS_GET_ALL_GUEST",
            data : guest,
            status:200
        }
    })
    
    static updateGuest = this.handleRequest(async(req:Request,res:Response)=>{
        const {guest_unid} = req.params
        const result = await GuestInvitation.UpdateGuest(guest_unid,req.body);
        return  {
            message : "SUCCESS_UPDATE_GUEST",
            data : result,
            status:200
        }
    })

    static ChangeGuestStatus = this.handleRequest(async (req:Request,res:Response)=>{
        const {guest_unid} = req.params
        const {status} = req.body
        
        const result = await GuestInvitation.UpdateGuestStatus(guest_unid,status)
        return {
            message : "SUCCESS_UPDATE_STATUS",
            data : result,
            status : 200
        }
    })
    
    static DeleteGuest = this.handleRequest(async(req:Request,res:Response)=>{
        const {guest_unid} = req.params
        const result = await GuestInvitation.DeleteGuest(guest_unid)
        return {
            message:"SUCCESS_DELETED_GUEST",
            status : 200
        } 
    })

    static GetGuestInvitation = this.handleRequest(async(req:Request,res:Response)=>{
        const { to } = req.query
        console.log(to);
        
        const result = await GuestInvitation.GetGuestWithWI(to as string)
        return {
            message :"SUCCESS_GET_GUEST_WEDINV",
            data : result,
            status: 200
        }
    })
}