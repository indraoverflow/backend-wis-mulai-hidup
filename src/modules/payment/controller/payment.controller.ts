import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import { PaymentService } from "../services/payment.services";
import { paymentType } from "../types/payment.type";

export class PaymentController extends AsyncHandler {
    constructor() {
        super();
    }

    static getBalance = this.handleRequest(async (req: Request, res: Response) => {
        const balance = await PaymentService.getBalance();
        return {
            status: 200,
            message: "Balance fetched successfully",
            data: balance
        }
    })
    static createPayment = this.handleRequest(async (req: Request, res: Response) => {
        const data = req.body as paymentType;

        return {
            status: 200,
            message: "Payment created successfully",
        }
    })
}
