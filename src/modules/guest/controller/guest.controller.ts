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
            data : guest
        }
    })

    

}