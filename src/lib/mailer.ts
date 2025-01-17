import nodemailer from "nodemailer";

// Define the email data interface
interface EmailData {
    to: string;
    subject: string;
    text: string;
    html: string;
}

// Create reusable transporter using nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME, // Your Zoho email address (set in env)
        pass: process.env.EMAIL_PASSWORD, // Your Zoho email password (set in env)
    },
});

/**
 * Send an email using Nodemailer.
 * @param {EmailData} emailData - The email details like recipient, subject, and body.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sendEmail = async (emailData: EmailData): Promise<void> => {
    const { to, subject, text, html } = emailData;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME, // Sender address
            to, // Recipient address
            subject, // Email subject
            text, // Plain text body
            html, // HTML body
        });

        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
