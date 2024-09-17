import {body, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';


export const CreateReceptionDto = [
	body('title_reception')
		.isString()
		.isLength({ min: 3, max: 50 }).withMessage('ERROR_LENGTH_TITLE_RECEPTION'),
	body('name_man')
		.isString(),
	body('name_woman')
		.isString(),
	body('start_date')
		.isString(),
	body('end_date')
		.isString(),
	body('location')
		.isString(),
	body('address')
		.isString(),
	body('user_id')
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