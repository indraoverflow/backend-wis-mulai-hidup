import { Router } from "express";
import { SubscribeController } from "./controller/subscribe.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";


const router = Router()

router.get("/",UserJwtVerify.adminVerify,SubscribeController.getAllSubscribe)
router.get("/user",UserJwtVerify.userVerify,SubscribeController.getSubscribeByUser)

export default (app:Router)=>{
    app.use("/subscription",router)
}

