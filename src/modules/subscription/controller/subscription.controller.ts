import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import SubscriptionService from "../services/subscription.service";

export default class SubssciprtionController extends AsyncHandler {
	constructor() {
		super()
	}

	static createNewSubscription = this.handleRequest(async (req: Request, res: Response) => {
		try {
			const {user_id} = req.headers
			const response = await SubscriptionService.createNewSubscriptionService({
				...req.body,
				userId: user_id!
			})
			return {
				status: 201,
				message: "Subscription created successfully",
				data: response
			}
		} catch (error) {
			console.log(error, '<<<<< error')
			return error
		}
	})

	static deleteSubscription = this.handleRequest(async (req: Request, res: Response) => {
		const {id} = req.params
		console.log(id, "<<<< id")
		const response = await SubscriptionService.deleteSubscriptionService(id)
		return {
			status: 200,
			message: "Subscription deleted successfully",
			data: response
		}
	})
}