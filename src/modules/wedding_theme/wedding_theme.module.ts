import { Router } from "express";
import ThemeController from "./controller/wedding_theme.controller";
import UserJwtVerify from "../../commons/middleware/userjwtverify";

const router = Router();

router.get("/", ThemeController.getalltheme)
router.post("/", UserJwtVerify.adminVerify, ThemeController.createTheme)
router.get("/:id", ThemeController.getThemeById)
router.patch("/:id", UserJwtVerify.adminVerify, ThemeController.updateTheme)
router.delete("/:id", UserJwtVerify.adminVerify, ThemeController.deleteTheme)

export default (app: Router) => {
    app.use("/wedding_theme", router)
}