import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const UpdateauthDto = [
    body('email')
        .optional()
        .isEmail().withMessage('EMAIL_TIDAK_VALID')
        .isLength({ max: 50 }).withMessage('ERROR_LENGTH_EMAIL'),
    body('name')
        .optional()
        .isString().withMessage('ERROR_LENGTH_NAME')
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_NAME'),
    body('gender')
        .optional()
        .isIn(['male', 'female', 'other']).withMessage('ERROR_GENDER'),
    body('phone_number')
        .optional()
        .isString().withMessage('ERROR_LENGTH_PHONE_NUMBER')
        .isLength({ max: 13 }).withMessage('ERROR_LENGTH_PHONE_NUMBER'),
    body('password')
        .optional()
        .isString().withMessage('ERROR_LENGTH_PASSWORD')
        .isLength({ min: 6, max: 50 }).withMessage('ERROR_LENGTH_PASSWORD'),
    body('role_id')
        .optional()
        .isUUID().withMessage('ERROR_ROLE_ID'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
]