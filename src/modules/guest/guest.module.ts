import { Router } from "express";
import GuestController from "./controller/guest.controller";
import { GuestDTO } from "./dto/guest.dto";

const router = Router();

router.post("/create",GuestDTO,GuestController.CreateGuest);


export default (app: Router) => {
    app.use("/guest", router)
}