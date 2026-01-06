import axios from "axios";

export async function sendEmail({ to, subject, html }) {
    return axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                email: process.env.SENDER_EMAIL,
                name: "UrbanConnect",
            },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
        }
    );
}
