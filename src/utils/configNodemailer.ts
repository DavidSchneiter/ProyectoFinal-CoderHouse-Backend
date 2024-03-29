import { createTransport } from 'nodemailer';
import { sanitizedConfig as config } from "./config"
export const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.MAIL,
        pass: config.MAIL_PASSWORD
    }
});