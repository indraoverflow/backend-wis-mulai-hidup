import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "secret",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    REDIRECT_URI: process.env.REDIRECT_URI || "http://localhost:3000/auth/google/callback",
};