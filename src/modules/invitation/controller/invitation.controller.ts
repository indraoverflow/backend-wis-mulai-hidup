import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import InvitationService from "../services/invitation.service";
import { error } from "console";


export default class InvitationController extends AsyncHandler {

	constructor() {
		super()
	}

	static createInvitation = this.handleRequest(async (req: Request, res: Response) => {
		const invitation = await InvitationService.createInvitationService(req.body)
		return {
			status: 201,
			message: "Invitation created successfully",
			data: invitation
		}
	})

	static getAllReceptionInvitation = this.handleRequest(async (req: Request, res: Response) => {
		const {wedding_reception_id} = req.params
		const invitation = await InvitationService.getAllReceptionInvitationService(+wedding_reception_id)
		return {
			message: "Invitation fetched successfully",
			data: invitation
		}
	})

	static deleteOneInvitation = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		await InvitationService.deleteInvitationService(+id)
		return {
			status: 200,
			message: "Invitation deleted successfully",
		}
	})
}