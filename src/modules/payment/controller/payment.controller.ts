import { Request, Response } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import { PaymentService } from "../services/payment.services";
import { paymentType } from "../types/payment.type";
import { jwtVerify } from "../../../commons/utils/jwtutils";
import { JwtPayload } from "jsonwebtoken";
export class PaymentController extends AsyncHandler {
    constructor() {
        super();
    }
    
    static createPayment = this.handleRequest(async (req: Request, res: Response) => {
        let data = req.body as paymentType;
        const decoded = jwtVerify(req.cookies.access_token) as JwtPayload
        
        const payment = await PaymentService.createPayment(data,decoded.id);
        return {
            status: 200,
            message: "Payment created successfully",
            data: payment
        }
    })

    static CheckPaymentStatus = this.handleRequest(async (req: Request, res: Response) => {
        const { id } = req.params;
        const payment = await PaymentService.CheckPaymentStatus(id);
        return {
            status: 200,
            message: "Payment info fetched successfully",
            payment
        }
    });
    
    static getPaymentInfoById = this.handleRequest(async (req: Request, res: Response) => {
        const { id } = req.params;
        const payment = await PaymentService.getPaymentInfoById(id);
        return {
            status: 200,
            message: "Payment info fetched successfully",
            payment
        }
    })

    static GetAllPaymentHistory = this.handleRequest(async (req: Request, res: Response) => {
        const decoded = jwtVerify(req.cookies.access_token) as JwtPayload
        const paymentHistory = await PaymentService.GetAllPaymentHistory(decoded.id);
        return {
            status: 200,
            message: "Payment history fetched successfully",
            data : paymentHistory
        }
    })

}
