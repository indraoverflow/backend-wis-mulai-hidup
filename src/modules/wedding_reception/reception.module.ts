import { Router } from "express";
import ReceptionController from "./controller/recepction.controller";
import { CreateReceptionDto } from "./dto/recepction.dto";
import UserJwtVerify from "../../commons/middleware/userjwtverify";
import {upload, uploadMultiple} from "../../middlewares/uploadMedia";
import { CreateInvitation } from "../../commons/middleware/CreateInvitation";

const router = Router();

router.get("/all", UserJwtVerify.adminVerify, ReceptionController.GetAllReception)
router.get("/:id", ReceptionController.GetOneReception)
router.delete("/:id", UserJwtVerify.adminVerify, ReceptionController.DeleteOneReception)
router.patch("/:id", UserJwtVerify.adminVerify, ReceptionController.UpdateOneReception)
router.patch("/status/cancel/:id", UserJwtVerify.adminVerify, ReceptionController.UpdateCancelReception)
router.patch("/status/complete/:id", UserJwtVerify.adminVerify, ReceptionController.UpdateCompleteReception)
router.patch("/status/in_progress/:id", UserJwtVerify.adminVerify, ReceptionController.UpdateInProgressReception)

router.get("/user/:id", ReceptionController.GetReceptionByUser)
router.post('/create', CreateInvitation.SubscriptionCheck,UserJwtVerify.userVerify, ReceptionController.CreateReception)
router.post('/upload_media/:receptionId', UserJwtVerify.userVerify, uploadMultiple, ReceptionController.UploadReceptionMedia)

export default (app: Router) => {
	app.use("/receptions", router)
}