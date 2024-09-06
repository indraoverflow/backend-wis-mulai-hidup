import { Router } from "express";
import ReceptionController from "./controller/recepction.controller";
import { CreateReceptionDto } from "./dto/recepction.dto";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();

router.get("/all", UserJwtVerify.adminVerify, ReceptionController.GetAllReception)
router.post('/create', UserJwtVerify.adminVerify, CreateReceptionDto, ReceptionController.CreateReception)

export default (app: Router) => {
	app.use("/receptions", router)
}