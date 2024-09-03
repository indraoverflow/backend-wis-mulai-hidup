import jwt from "jsonwebtoken";
import config from "../../config/config";

interface JwtPayload {
    data: any;
    expiresIn: string;
}

const serializeBigInt = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export const jwtSign = (data: JwtPayload) => {
    const serializedData = serializeBigInt(data);
    return jwt.sign({ data: JSON.stringify(serializedData) }, config.SECRET_KEY, { expiresIn: data.expiresIn });
}

export const jwtVerify = (token: string) => {
    return jwt.verify(token, config.SECRET_KEY);
}

