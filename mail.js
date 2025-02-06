import nodemailer from "nodemailer";

async function mailer(receiver) {
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
        html: "<h1>Hello</h1><p>This is an HTML email.</p>", // HTML version
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error:", error);
    }    
};

export default mailer;

