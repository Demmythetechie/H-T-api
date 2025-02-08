import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

async function mailer(receiver, name) {
    // Read the HTML file
    const templatePath = path.join(process.cwd(), "email-template.html");
    let emailTemplate = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders
    emailTemplate = emailTemplate.replace("{{name}}", name).replace("{{verification_link}}", "google.com");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // or 587
        secure: true, // true for 465, false for 587
        auth: {
            user: "naim.okunade@gmail.com",
            pass: "vhevulzzaoogusvj",
        },
    });

    const mailOptions = {
        from: "naim.okunade@gmail.com", // Sender's email
        to: receiver, // Multiple recipients
        subject: "Subject of the Email",
        text: "Plain text body of the email",
        html: emailTemplate
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error:", error);
    }
};

export default mailer;

