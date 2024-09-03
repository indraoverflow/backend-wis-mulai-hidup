import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES Modules*/

/* ROUTES Modules*/


/* ERROR HANDLER */
app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


export default app;
