import e from "express";
import cors from "cors";
import mongoose from "mongoose";
import signUp from "./schemasModels/userSignUp.js";
import mailer from "./mail.js";
const app = e();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const rules = cors();
app.use(cors({origin: 'https://hack-tack.vercel.app'}));
app.use(e.json());

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
            mailer(message.email, message.fname, token);
            res.send("Saved Succefully");
        }
    } catch(error) {
        res.send(`Not saved ${error}`);
    }
});

app.get('/verify/:token', async (req, res) => {
    try {
        const { token } =  req.params;
        const verifying = jwt.verify(token, secretKey);
        await signUp.findOneAndUpdate({ Email: verifying }, { $set: { verified: true } });
        res.send('validated Succesfully');
    } catch(e) {
        res.send(e);
    }
    
});

//-------------------------------------------------------------------------

app.listen(3000, () => {});