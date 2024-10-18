import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const CreateSubscribeTypeDto = [
    body('name')
        .isString().withMessage('NAME_NOT_VALID')
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_NAME'),
    body('price')
        .isNumeric().withMessage('PRICE_NOT_VALID')
        .isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_PRICE'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
