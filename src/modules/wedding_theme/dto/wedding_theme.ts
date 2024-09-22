import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const CreateWeddingThemeDto = [
    body('theme_id')
			.notEmpty(),
		body('wedding_reception_id')
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
