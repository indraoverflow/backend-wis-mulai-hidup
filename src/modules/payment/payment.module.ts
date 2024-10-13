import { Router } from "express";
import { PaymentController } from "./controller/payment.controller";
import { CreatePaymentDto } from "./dto/payment.dto";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();
/*
 TESTER
*/

// router.get("/balance", PaymentController.getBalance)
router.post("/create", CreatePaymentDto,UserJwtVerify.userVerify,PaymentController.createPayment)
router.get("/status/:id", UserJwtVerify.userVerify,PaymentController.CheckPaymentStatus)
router.get("/info/:id",UserJwtVerify.userVerify,PaymentController.getPaymentInfoById)
router.get("/history", UserJwtVerify.userVerify,PaymentController.GetAllPaymentHistory)

export default (app: Router) => {
    app.use("/payment", router)
}
