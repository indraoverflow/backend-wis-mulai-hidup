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

	static GetReceptionByUser = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.getReceptionByUserService(+id)
		return response
	})

	static GetOneReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.getOneRecpetionService(+id)
		return response
	})

	static CreateReception = this.handleRequest(async (req: Request, res: Response) => {
		const body = req.body
		const {theme_id} = body
		const {wedding_ceremony} = body
		const {user_id} = req.headers
		// const {wedding_media} = body
		// const {man_media} = body
		// const {woman_media} = body
		const response = await ReceptionService.createReceptionService(+user_id!, body, theme_id, wedding_ceremony)
		// const response = await ReceptionService.createReceptionService(body, theme_id, wedding_ceremony, wedding_media, man_media, woman_media)
		return response
	})

	static UploadReceptionMedia = this.handleRequest(async (req: Request, res: Response) => {
		const {receptionId} = req.params
		const {photoLocations} = req.headers 
		const {weddingMedia} = photoLocations
		const {manMedia} = photoLocations
		const {womanMedia} = photoLocations
		const response = await ReceptionService.updateReceptionMediaService(+receptionId, weddingMedia, manMedia, womanMedia)
		return {
			status: 200,
			message: "Upload reception media successfully",
		}
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

	static UpdateCancelReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.updateCancelReceptionService(+id)
		return response
	})

	static UpdateCompleteReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.updateCompleteReceptionService(+id)
		return response
	})
	
	static UpdateInProgressReception = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		const response = await ReceptionService.updateInProgressReceptionService(+id)
		return response
	})
}