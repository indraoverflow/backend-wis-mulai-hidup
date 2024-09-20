import { Request, Response } from 'express';
import AsyncHandler from '../../../commons/utils/asynhandler';
import AuthService from '../services/auth.service';
import { JwtPayload, jwtSign, jwtVerify } from '../../../commons/utils/jwtutils';
import { AuthorizationOauth } from '../../../config/googleoauth';

// import SendEmail from '../../../commons/smtp/sendemail';

export default class AuthController extends AsyncHandler {
    constructor() {
        super()
    }

    private static setCookies(res: Response, accessToken: string, refreshToken: string) {
        res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('access_token', accessToken, { httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 });
    }

    static login = this.handleRequest(async (req: Request, res: Response) => {
        const body = req.body;
        const response = await AuthService.loginService(body)

        const accesstoken = jwtSign(response, "10m")
        const refreshtoken = jwtSign(response, "1d")
        await AuthService.refreshTokenService(response.id, refreshtoken)

        this.setCookies(res, accesstoken, refreshtoken)

        return {
            status: 200,
            message: "Login successfully",
            token: {
                access_token: accesstoken,
                refresh_token: refreshtoken
            }
        };
    })

    static register = this.handleRequest(async (req: Request, res: Response) => {

        const body = req.body;
        const response = await AuthService.registerService(body)

        const accesstoken = jwtSign(response, "10m")
        const refreshtoken = jwtSign(response, "1d")
        await AuthService.refreshTokenService(response.id, refreshtoken)

        this.setCookies(res, accesstoken, refreshtoken)

        return {
            status: 201,
            message: "Register successfully",
            data: response,
            token: {
                access_token: accesstoken,
                refresh_token: refreshtoken
            }
        }

    })

    static logout = this.handleRequest(async (req: Request, res: Response) => {
        const access_token = req.cookies.access_token
        const decoded = jwtVerify(access_token) as JwtPayload
        await AuthService.logoutService(decoded.id)

        res.clearCookie('access_token')
        res.clearCookie('refresh_token')

        return {
            status: 200,
            message: "Logout successfully"
        }
    })

    static authGoogle = (req: Request, res: Response) => {
        const url = AuthorizationOauth
        res.redirect(url)
    }

    static authGoogleCallback = this.handleRequest(async (req: Request, res: Response) => {

        const code = req.query.code as string
        const response = await AuthService.authGoogleService(code)
        const accesstoken = jwtSign(response, "10m")
        const refreshtoken = jwtSign(response, "1d")
        await AuthService.refreshTokenService(response.id, refreshtoken)

        this.setCookies(res, accesstoken, refreshtoken)

        // redirect to home frontend
        // res.redirect('http://localhost:3000/authsuccess?token=accesstoken&refresh=refreshtoken')

        return {
            status: 200,
            message: "Login successfully",
            token: {
                access_token: accesstoken,
                refresh_token: refreshtoken
            }
        }
    })

    static forgetPassword = this.handleRequest(async (req: Request, res: Response) => {
        const body = req.body
        const response = await AuthService.forgotPasswordService(body)

        // TODO: send email
        // const sendEmail = new SendEmail()
        // await sendEmail.sendEmail(body.email, "Forgot Password", "http://localhost:3000/auth/changepassword?token=" + response)
        // TODO: send email

        return {
            status: 200,
            message: "Request change password successfully",
            url: "http://localhost:3000/auth/changepassword?token=" + response
        }
    })

    static changePassword = this.handleRequest(async (req: Request, res: Response) => {

        const token = req.query.token as string
        const body = req.body
        const decoded = jwtVerify(token) as JwtPayload
        await AuthService.changePasswordService(decoded.email, body)

        return {
            status: 200,
            message: "Request change password successfully",
        }
    })

    static refreshToken = this.handleRequest(async (req: Request, res: Response) => {

        const refreshToken = req.cookies.refresh_token
        const decoded = jwtVerify(refreshToken) as JwtPayload
        const payload = { id: decoded.id, email: decoded.email, name: decoded.name, role_name: decoded.role_name }

        const accesstoken = jwtSign(payload, "10m")
        const refreshtoken = jwtSign(payload, "1d")

        await AuthService.refreshTokenService(decoded.id, refreshtoken)

        this.setCookies(res, accesstoken, refreshtoken)

        return {
            status: 200,
            message: "Refresh token successfully",
            token: {
                access_token: accesstoken,
                refresh_token: refreshtoken
            }
        }

    })
}