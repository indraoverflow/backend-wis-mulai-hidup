import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import ReceptionService from "../services/recepction.services";

export default class ReceptionController extends AsyncHandler {
	constructor() {
		super()
	}

	static GetAllReception = this.handleRequest(async (req: Request, res: Response) => {
		const response = await ReceptionService.getAllReceptionService()
		return {
			status: 200,
			message: "Get all reception successfully",
			data: response
		}
	})

	static CreateReception = this.handleRequest(async (req: Request, res: Response) => {
		const body = req.body
		const response = await ReceptionService.createReceptionService(body)
		return {
			status: 201,
			message: "Create reception successfully",
			data: response
		}
	})
}