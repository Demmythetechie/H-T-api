import e from "express";
import cors from "cors";
import mongoose from "mongoose";
import signUp from "./Schemas_Models/userSignUp";
const app = e();
const rules = cors();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(e.json());


(async function () {
    try {
        await mongoose.connect('mongodb+srv://demmythetechie:Alade3015@h-t.8p6yq.mongodb.net/?retryWrites=true&w=majority&appName=H-T')
        console.log('connected Successfully ✅');
    } catch(error) {
        console.error("MongoDB Connection Error ❌:", error);
        process.exit(1);
    }
})();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/signup', (req, res) => {
    const message = req.body;
    res.send(`Gotten the data needed ${message}`);
});

app.listen(3000, () => {});