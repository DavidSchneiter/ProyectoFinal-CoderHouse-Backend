import { createTransport } from 'nodemailer';
import 'dotenv/config'

export const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
});