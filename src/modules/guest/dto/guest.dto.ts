import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const GuestDTO = [
    body('wedding_reception_id')
			.notEmpty(),
	body('name')
            .isString()
			.notEmpty(),
    body('phone_number')
            .isString()
			.notEmpty(),
    body('status')
            .isString()
			.notEmpty(),    
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
