import { Request, Response } from 'express';
import AsyncHandler from '../../../commons/utils/asynhandler';
import AuthService from '../services/auth.service';
import { jwtSign } from '../../../commons/utils/jwtutils';
import { AuthorizationOauth } from '../../../config/googleoauth';

export default class AuthController extends AsyncHandler {
    constructor() {
        super()
    }


    static login = this.handleRequest(async (req: Request, res: Response) => {
        const body = req.body;
        const response = await AuthService.loginService(body)

        const accesstoken = jwtSign({ data: response, expiresIn: "10m" })
        const refreshtoken = jwtSign({ data: response, expiresIn: "1d" })
        await AuthService.refreshTokenService(response.id, refreshtoken)

        res.cookie('refresh_token', refreshtoken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('access_token', accesstoken, { httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 });

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

        const accesstoken = jwtSign({ data: response, expiresIn: "10m" })
        const refreshtoken = jwtSign({ data: response, expiresIn: "1d" })
        await AuthService.refreshTokenService(response.id, refreshtoken)

        res.cookie('refresh_token', refreshtoken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('access_token', accesstoken, { httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 });

        return {
            status: 201,
            message: "Register successfully",
            data: response
        };

    })


    static authGoogle = (req: Request, res: Response) => {
        const url = AuthorizationOauth
        res.redirect(url)
    }

    static authGoogleCallback = this.handleRequest(async (req: Request, res: Response) => {
        const code = req.query.code as string
        const response = await AuthService.authGoogleService(code)
        const accesstoken = jwtSign({ data: response, expiresIn: "10m" })
        const refreshtoken = jwtSign({ data: response, expiresIn: "1d" })
        await AuthService.refreshTokenService(response.id, refreshtoken)

        res.cookie('refresh_token', refreshtoken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('access_token', accesstoken, { httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 });
        // redirect to home frontend
        // res.redirect('http://localhost:3000/authsuccess?token=accesstoken&refresh=refreshtoken')
        return {
            status: 200,
            message: "Login successfully",
            token: {
                access_token: accesstoken,
                refresh_token: refreshtoken
            }
        };
    })
}