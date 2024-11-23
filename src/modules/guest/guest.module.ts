import { Router } from "express";
import GuestController from "./controller/guest.controller";
import { GuestDTO, UpdateGuest, UpdateGuestDTO } from "./dto/guest.dto";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();

router.get("/",GuestController.GetGuestInvitation)
router.post("/create",GuestDTO,UserJwtVerify.userVerify,GuestController.CreateGuest)
router.get("/:wedding_id",UserJwtVerify.userVerify,GuestController.GetAllGuest)
router.patch("/status/:guest_unid",UpdateGuest,GuestController.ChangeGuestStatus)
router.patch("/update/:guest_uind",UpdateGuestDTO,UserJwtVerify.userVerify,GuestController.updateGuest)
router.delete("/delete/:guest_id",UserJwtVerify.userVerify,GuestController.DeleteGuest)

export default (app: Router) => {
    app.use("/guest", router)
}