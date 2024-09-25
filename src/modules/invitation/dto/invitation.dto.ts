import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const CreateInvitationDto = [
	body('name')
		.isString()
		.isLength({ min: 3, max: 255 }).withMessage('ERROR_LENGTH_NAME'),
	body('phone_number')
		.isString()
		.isLength({ min: 3, max: 255 }).withMessage('ERROR_LENGTH_PHONE_NUMBER'),
	body('wedding_reception_id')
		.isNumeric(),
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