import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const CreateThemeDto = [
    body('theme_name')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_THEME_NAME'),
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
