import { Request, Response, NextFunction } from 'express';

class AsyncHandler {
    static handleRequest(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next))
                .then((result) => {
                    if (result !== undefined) {
                        const status = result.status || 200;
                        delete result.status;
                        res.status(status).json(this.serializeBigInt(result));
                    }
                })
                .catch(next);
        };
    }

    private static serializeBigInt(obj: any): any {
        return JSON.parse(JSON.stringify(obj, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }
}

export default AsyncHandler;