import { Router } from "express";
import ThemeController from "./controller/theme.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";
import { CreateThemeDto } from "./dto/theme.dto";

const router = Router();

router.get("/", ThemeController.getalltheme)
router.post("/", UserJwtVerify.adminVerify, CreateThemeDto, ThemeController.createTheme)
router.get("/:id", ThemeController.getThemeById)
router.patch("/:id", UserJwtVerify.adminVerify, ThemeController.updateTheme)
router.delete("/:id", UserJwtVerify.adminVerify, ThemeController.deleteTheme)

export default (app: Router) => {
    app.use("/theme", router)
}