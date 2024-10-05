import { Router } from "express";
import SubscriptionController from "./controller/subscription.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();

router.post("/", UserJwtVerify.userVerify, SubscriptionController.createNewSubscription);
router.delete('/:id', UserJwtVerify.userVerify, SubscriptionController.deleteSubscription);

export default (app: Router) => {
	app.use("/subscriptions", router);
}