import e from "express";
import cors from "cors";
import mongoose, { trusted } from "mongoose";
import signUp from "./schemasModels/userSignUp.js";
import verifyEmail from "./emails/confirmEmail.js";
import verifiedReciept from "./emails/confirmedEmail.js";
import path from 'path';
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app = e();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const corsOptions = {
    origin: ['http://localhost:3000', 'https://hack-tack.vercel.app'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(e.json());

//Initialized the cookie parser for sending token to users after login
app.use(cookieParser());

// Set EJS as the template engine (This is for the rendered html for email confirmation)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure views folder exists


// Initializing the enviroment variable
dotenv.config();


(async function () {
    try {
        await mongoose.connect('mongodb+srv://demmythetechie:Alade3015@h-t.8p6yq.mongodb.net/usersInfo?retryWrites=true&w=majority&appName=H-T')
        console.log('connected Successfully ✅');
    } catch(error) {
        console.error("MongoDB Connection Error ❌:", error);
        process.exit(1);
    }
})();


app.get('/', (req, res) => {
    res.send('Hello World');
});


//--------------------------------------------------------------------

// This is the API handling the signup request for new users

app.post('/signup', async (req, res) => {
    const message = req.body;
    const usersDetails = new signUp({
        Firstname: message.fname,
        Lastname: message.lname,
        Email: message.email,
        Password: message.pswd,
        year: new Date().toLocaleString(),
        verified: false
    });

    try {
        const exist = await signUp.findOne({Email: message.email});
        if (exist) {
            res.send('An account has been created with this email');
        } else {
            const emails = message.email
            await usersDetails.save();
            const token = jwt.sign({ userEmail: emails }, process.env.SECRET_KEY, { expiresIn: "24h" });
            verifyEmail(message.email, message.fname, token);
            res.send("Saved Succefully");
        }
    } catch(error) {
        res.send(`Not saved ${error}`);
    }
});

//---------------------------------------------------------------------------


// This function is for Email verification after Sign Up

app.get('/verify/:token', async (req, res) => {
    try {
        const { token } =  req.params;
        const verifying = jwt.verify(token, process.env.SECRET_KEY);
        const user = await signUp.findOne({Email: verifying.userEmail});
        if (!user.verified) {
            await signUp.findOneAndUpdate({ Email: verifying.userEmail }, { $set: { verified: true } });
            verifiedReciept(verifying.userEmail, user.Firstname);
            res.render("confirmation", { 
                title: "Email Verified",
                message: "Your email has been confirmed succesfully"
            });
        } else {
            res.render("expired", { 
                title: "Link has expired",
                message: "Confirmation link has expired"
            });
        }
    } catch(e) {
        return res.status(401).render('401');
    }
    
});

//-------------------------------------------------------------------------

app.post('/signin', async (req, res) => {
    try {
        const loginDetails = req.body;
        const log = await signUp.findOne({Email: loginDetails.email});
        if (log === null) {
            res.send({exst: true, status: false});
            return;
        }
        if (loginDetails.pswd === log.Password) {
            const access = jwt.sign({Email: loginDetails.email}, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.cookie("ht-token", access, {
                httpOnly: true,    // Prevents JavaScript access
                secure: true,      // Send only over HTTPS (set to false for local testing)
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 3600000,    // 1 hour expiration
            });
            res.send({exst: false, status: true});
        } else {
            res.send({exst: false, status: false});
        }
    } catch(error) {
        console.log("e");
        res.send(error);
    }
});

app.listen(3000, () => {});