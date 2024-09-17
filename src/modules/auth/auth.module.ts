import { Router } from "express"
import AuthController from "./controller/auth.controller"
import { CreateAuthDto } from "./dto/auth.dto"
import UserJwtVerify from "../../commons/middleware/userjwtverify"
import { UpdateauthDto } from "./dto/update.auth";

const router = Router();

router.post("/login", AuthController.login)
router.post("/register", CreateAuthDto, AuthController.register)

router.get("/google", AuthController.authGoogle)
router.get("/google/callback", AuthController.authGoogleCallback)

router.post("/forgetpassword", UpdateauthDto, AuthController.forgetPassword)
router.post("/changepassword", UserJwtVerify.forgotPasswordVerify, UpdateauthDto, AuthController.changePassword)

router.get("/refresh-token", UserJwtVerify.refreshTokenVerify, AuthController.refreshToken)
router.delete("/logout", UserJwtVerify.userVerify, AuthController.logout)

export default (app: Router) => {
    app.use("/auth", router);
}
