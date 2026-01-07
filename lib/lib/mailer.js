import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: 587,
    secure: false, // IMPORTANT
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
    },
})
