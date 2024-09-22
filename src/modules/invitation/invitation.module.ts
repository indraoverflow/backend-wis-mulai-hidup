import { Router } from "express";
import InvitationController from "./controller/invitation.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";
import { CreateInvitationDto } from "./dto/invitation.dto";

const router = Router();

router.get("/:wedding_reception_id", UserJwtVerify.userVerify, InvitationController.getAllReceptionInvitation)
router.post('/', UserJwtVerify.userVerify, CreateInvitationDto, InvitationController.createInvitation)
router.delete('/:id', UserJwtVerify.userVerify, InvitationController.deleteOneInvitation)

export default (app: Router) => {
	app.use("/invitations", router)
}