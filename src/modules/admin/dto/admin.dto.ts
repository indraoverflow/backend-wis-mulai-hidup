import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const CreateAdminDto = [
    body('email')
        .isEmail().withMessage('EMAIL_NOT_VALID')
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_EMAIL'),
    body('password')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_PASSWORD'),
    body('phone_number')
        .isString()
        .isLength({ max: 13 }).withMessage('ERROR_LENGTH_PHONE_NUMBER'),
    body('name')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_NAME'),
    body('gender')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_NAME'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]


export const LoginAdminDto = [
    body('email')
        .isEmail().withMessage('EMAIL_NOT_VALID')
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_EMAIL'),
    body('password')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_PASSWORD'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((error: any) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]