import { Router } from "express";
import AdminController from "./controller/admin.controller";
import { CreateAdminDto, LoginAdminDto } from "./dto/admin.dto";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();

router.post("/login", LoginAdminDto, AdminController.loginAdmin)
router.post("/register", CreateAdminDto, AdminController.registerAdmin)
router.delete("/logout", UserJwtVerify.adminVerify, AdminController.logoutAdmin)
router.get("/refresh-token", AdminController.refreshToken)

export default (app: Router) => {
    app.use("/admin", router)
}