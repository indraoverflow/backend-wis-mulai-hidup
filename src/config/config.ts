import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    REDIRECT_URI: process.env.REDIRECT_URI || "http://localhost:3000/auth/google/callback",
    SMTP_HOST: process.env.SMTP_HOST || "smtp.ethereal.email",
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || "daron.bartell@ethereal.email",
    SMTP_PASS: process.env.SMTP_PASS || "H4tDCB7PF3y4kvxa9s",
};