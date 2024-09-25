import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import csurf from "csurf"
import authModule from "./modules/auth/auth.module"
import userModule from "./modules/user/user.module"
import adminModule from "./modules/admin/admin.module"
import themeModule from "./modules/theme/theme.module";
import receptionModule from "./modules/wedding_reception/reception.module"
import ratelimit from "express-rate-limit"
import weddingThemeModule from "./modules/wedding_theme/wedding_theme.module"
import invitationModule from "./modules/invitation/invitation.module"


const app = express();
const limit = ratelimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
})


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csurf({ cookie: true }))
app.use(limit)

app.get("/protect", (req: Request, res: Response) => {
    res.cookie("XSRF-TOKEN", req.csrfToken())
    res.json({ csrf_token: req.csrfToken() })
})
/* ROUTES Modules*/
authModule(app);
userModule(app);
adminModule(app);
themeModule(app);
receptionModule(app);
weddingThemeModule(app);
invitationModule(app);
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
