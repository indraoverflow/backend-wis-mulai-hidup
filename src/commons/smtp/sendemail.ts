import nodemailer from "nodemailer";
import config from "../../config/config";

class SendEmail {
    private host: string | undefined;
    private port: number | undefined;
    private user: string | undefined;
    private pass: string | undefined;

    constructor() {
        this.host = config.SMTP_HOST;
        this.port = Number(config.SMTP_PORT);
        this.user = config.SMTP_USER;
        this.pass = config.SMTP_PASS;
    }

    async sendEmail(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: false,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });

        const info = await transporter.sendMail({
            from: this.user,
            to,
            subject,
            text
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    }
}

export default SendEmail;