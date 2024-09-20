import { Router } from "express"
import UserController from "./controller/user.controller"
import UserJwtVerify from "../../commons/middleware/userjwtverify"
import { UpdateUserDto } from "./dto/updateuser.dto"

const router = Router()

router.get("/", UserJwtVerify.adminVerify, UserController.Getalluser)
router.get("/:id", UserJwtVerify.adminVerify, UserController.Getuserbyid)
router.patch("/:id", UserJwtVerify.adminVerify, UpdateUserDto, UserController.updateUserbyid)
router.delete("/:id", UserJwtVerify.adminVerify, UserController.deleteUser)

export default (app: Router) => {
    app.use("/user", router)
}