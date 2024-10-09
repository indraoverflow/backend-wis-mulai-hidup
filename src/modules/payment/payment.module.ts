import { Router } from "express";
import { PaymentController } from "./controller/payment.controller";

const router = Router();

router.get("/balance", PaymentController.getBalance)

export default (app: Router) => {
    app.use("/payment", router)
}
