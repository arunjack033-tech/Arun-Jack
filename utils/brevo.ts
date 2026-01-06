
import * as brevo from '@getbrevo/brevo';

// Initialize the Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();

// Set the API key
// NOTE to User: You must add BREVO_API_KEY=YOUR_KEY to your .env.local file
const apiKey = process.env.BREVO_API_KEY || '';

if (apiKey) {
    // Authenticate properly with the API key
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
} else {
    console.warn("BREVO_API_KEY is missing in environment variables. Email sending will fail.");
}

interface SendEmailParams {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    textContent?: string;
}

export async function sendEmail({ to, subject, htmlContent, textContent }: SendEmailParams) {
    if (!apiKey) {
        console.error("Cannot send email: BREVO_API_KEY is not configured.");
        return { success: false, error: "Configuration missing" };
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { "name": "UrbanConnect", "email": "no-reply@urbanconnect.com" }; // You should verify a sender in Brevo
    sendSmtpEmail.to = to;
    if (textContent) sendSmtpEmail.textContent = textContent;

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully via Brevo. Message ID:', data.body.messageId);
        return { success: true, data };
    } catch (error: any) {
        console.error('Error sending email via Brevo:', error);
        return { success: false, error: error.message || error };
    }
}
