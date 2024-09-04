import jwt from "jsonwebtoken";
import config from "../../config/config";

export interface JwtPayload {
    id: string
    email: string
    name?: string | null | undefined
    role: string
}



export const jwtSign = (data: JwtPayload, expiresIn: string) => {
    return jwt.sign(data, config.SECRET_KEY, { expiresIn: expiresIn });
}

export const jwtVerify = (token: string) => {
    return jwt.verify(token, config.SECRET_KEY);
}

