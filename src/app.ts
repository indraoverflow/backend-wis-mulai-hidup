import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authModule from "./modules/auth/auth.module";
import userModule from "./modules/user/user.module";
import adminModule from "./modules/admin/admin.module";
import themeModule from "./modules/theme/theme.module";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/* ROUTES Modules*/
authModule(app);
userModule(app);
adminModule(app);
themeModule(app);
/* ROUTES Modules*/


/* ERROR HANDLER */
app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(error.status || 404).json({ message: error.message });
});


export default app;
