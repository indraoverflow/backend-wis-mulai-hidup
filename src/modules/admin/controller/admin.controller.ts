import { Request, Response } from "express";
import AdminService from "../services/admin.service";
import AsyncHandler from "../../../commons/utils/asynhandler";
import { jwtSign, jwtVerify } from "../../../commons/utils/jwtutils";
import { JwtPayload } from "jsonwebtoken";

export default class AdminController extends AsyncHandler {
    constructor() {
        super()
    }
    private static setCookies(res: Response, accessToken: string, refreshToken: string) {
        res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('access_token', accessToken, { httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 });
    }

    // login admin
    static loginAdmin = this.handleRequest(async (req: Request, res: Response) => {
        const { email, password } = req.body
        const admin = await AdminService.loginAdminService(email, password)
        const accesstoken = jwtSign(admin, "10m")
        const refreshtoken = jwtSign(admin, "1d")
        await AdminService.refreshTokenService(+admin.id, refreshtoken)
        this.setCookies(res, accesstoken, refreshtoken)
        return {
            status: 200,
            message: "Login admin successfully",
            token: {
                accesstoken,
                refreshtoken
            }
        }
    })

    // register admin
    static registerAdmin = this.handleRequest(async (req: Request, res: Response) => {
        const body = req.body
        const admin = await AdminService.registerAdminService(body)
        const accesstoken = jwtSign(admin, "10m")
        const refreshtoken = jwtSign(admin, "1d")
        await AdminService.refreshTokenService(+admin.id, refreshtoken)
        this.setCookies(res, accesstoken, refreshtoken)
        return {
            status: 200,
            message: "Register admin successfully",
            token: {
                accesstoken,
                refreshtoken
            }
        }
    })

    // logout admin
    static logoutAdmin = this.handleRequest(async (req: Request, res: Response) => {
        const access_token = req.cookies.access_token
        const decoded = jwtVerify(access_token) as JwtPayload
        await AdminService.logoutAdminService(+decoded.id)
        res.clearCookie('refresh_token')
        res.clearCookie('access_token')
        return {
            status: 200,
            message: "Logout admin successfully"
        }
    })

    // refresh token
    static refreshToken = this.handleRequest(async (req: Request, res: Response) => {
        const refresh_token = req.cookies.refresh_token
        const decoded = jwtVerify(refresh_token) as JwtPayload
        const payload = { id: decoded.id, email: decoded.email, name: decoded.name, role_name: decoded.role_name }

        const accesstoken = jwtSign(payload, "10m")
        const refreshtoken = jwtSign(payload, "1d")

        await AdminService.refreshTokenService(payload.id, refreshtoken)
        this.setCookies(res, accesstoken, refreshtoken)

        return {
            status: 200,
            message: "Refresh token successfully",
            token: {
                accesstoken,
                refreshtoken
            }
        }
    })
}