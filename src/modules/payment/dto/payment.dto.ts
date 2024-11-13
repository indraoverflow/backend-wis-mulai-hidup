import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validasi untuk CreatePaymentDto
export const CreatePaymentDto = [
    body('subscribe_type_id')
        .isNumeric().withMessage('SUBSCRIBE_TYPE_ID_NOT_VALID'),
    body('currency')
        .isString().withMessage('CURRENCY_NOT_VALID')  
        .isIn(['IDR']).withMessage('CURRENCY_NOT_SUPPORTED'), 
    body('payment_method')
        .isObject().withMessage('PAYMENT_METHOD_NOT_VALID'), 
    body('payment_method.type')
        .isString().withMessage('PAYMENT_METHOD_TYPE_NOT_VALID')  
        .isIn(['VIRTUAL_ACCOUNT']).withMessage('PAYMENT_METHOD_TYPE_NOT_SUPPORTED'),  
    body('payment_method.reusability')
        .isString().withMessage('REUSABILITY_NOT_VALID')  
        .isIn(['ONE_TIME_USE']).withMessage('REUSABILITY_NOT_SUPPORTED'), 
    body('payment_method.virtual_account')
        .isObject().withMessage('VIRTUAL_ACCOUNT_NOT_VALID'), 
    body('payment_method.virtual_account.channel_code')
        .isString().withMessage('CHANNEL_CODE_NOT_VALID')
        .isIn(['BCA','BJB','BNI','BRI','MANDIRI','PERMATA','CIMB','HANA'])
        .withMessage('CHANNEL_CODE_NOT_SUPPORTED'),
    body('metadata')
        .isObject().withMessage('METADATA_NOT_VALID'), 
    body('metadata.sku')
        .isString().withMessage('SKU_NOT_VALID'), 
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
];
