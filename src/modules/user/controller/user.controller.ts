import { Response, Request } from "express";
import AsyncHandler from "../../../commons/utils/asynhandler";
import UserService from "../services/user.service";

export default class UserController extends AsyncHandler {
    constructor() {
        super()
    }
    static Getalluser = this.handleRequest(async (req: Request, res: Response) => {

        const response = await UserService.getUserService()

        return {
            status: 200,
            message: "Get user successfully",
            data: response
        }

    })

    static Getuserbyid = this.handleRequest(async (req: Request, res: Response) => {
        const id = req.params.id
        const response = await UserService.getUseridService(+id)
        return {
            status: 200,
            message: "Get user by id successfully",
            data: response
        }

    })

    static updateUserbyid = this.handleRequest(async (req: Request, res: Response) => {

        const id = req.params.id
        const body = req.body
        const response = await UserService.updateUserService(+id, body)

        return {
            status: 200,
            message: "Update user successfully",
            data: response
        }
    })

    static deleteUser = this.handleRequest(async (req: Request, res: Response) => {

        const id = req.params.id
        const response = await UserService.deleteUserService(+id)

        return {
            status: 200,
            message: "Delete user successfully",
            data: response
        }

    })

}
