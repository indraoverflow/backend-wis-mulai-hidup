import { Router } from "express";
import AuthController from "./controller/auth.controller";
import { CreateAuthDto } from "./dto/auth.dto";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", CreateAuthDto, AuthController.register);
router.get("/google", AuthController.authGoogle);
router.get("/google/callback", AuthController.authGoogleCallback);


export default (app: Router) => {
    app.use("/auth", router);
}
