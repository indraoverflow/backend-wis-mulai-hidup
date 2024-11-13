import { Router } from "express";
import { SubscribeController } from "./controller/subscribe.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";
import { CreateSubscribeTypeDto } from "./dto/subscribe_type.dto";


const router = Router()

router.get("/",UserJwtVerify.adminVerify,SubscribeController.getAllSubscribe)
router.post("/",UserJwtVerify.adminVerify,CreateSubscribeTypeDto,SubscribeController.createSubscribetype)
router.get("/user",UserJwtVerify.userVerify,SubscribeController.getSubscribeByUser)
router.patch("/update/:id",UserJwtVerify.adminVerify,CreateSubscribeTypeDto,SubscribeController.updateSubscribetype)
router.delete("/delete/:id",UserJwtVerify.adminVerify,SubscribeController.deleteSubscribetype)
router.get("/type",SubscribeController.getSubscribeType)

export default (app:Router)=>{
    app.use("/subscription",router)
}

