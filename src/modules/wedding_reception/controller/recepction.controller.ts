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

	static GetOneReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.getOneRecpetionService(+id)
		return response
	})

	static CreateReception = this.handleRequest(async (req: Request, res: Response) => {
		const body = req.body
		const response = await ReceptionService.createReceptionService(body)
		return response
	})

	static DeleteOneReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.deleteOneReceptionService(+id)
		return response
	})

	static UpdateOneReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const body = req.body
		const response = await ReceptionService.updateOneReceptionService(+id, body)
		return response
	})
}