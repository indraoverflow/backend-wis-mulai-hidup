import { Request, Response } from "express";
import GuestMessageService from "../services/guest_message.service";
import AsyncHandler from "../../../commons/utils/asynhandler";

export default class GuestMessageController extends AsyncHandler {
    constructor () {
        super()
    }

    static createMessageByGuest = this.handleRequest(async (req: Request, Res: Response) => {
        const {guest_invitation_id} = req.params
        const {message, status, name} = req.body
        const response = await GuestMessageService.createMessageByGuestService(guest_invitation_id, req.body)
        return {
            status: 201,
            message: "Create new message successfully",
            data: response
        }
    })

    static getAllReceptionMessages = this.handleRequest(async (req: Request, Res: Response) => {
        const {reception_id} = req.params
        const messages = await GuestMessageService.getAllReceptionMessageService(reception_id)
        return {
            status: 200,
            message: "Get all reception messages successfully",
            data: messages
        }
    }) 
    
}