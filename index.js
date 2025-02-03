import e from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = e();
const rules = cors();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(e.json());

var test = '';

(async function () {
    try {
        await mongoose.connect('mongodb+srv://demmythetechie:Alade3015@h-t.8p6yq.mongodb.net/?retryWrites=true&w=majority&appName=H-T')
        console.log('connected Successfully ✅');
        test = 'connected Successfully ✅'
    } catch(error) {
        console.error("MongoDB Connection Error ❌:", error);
        test = 'MongoDB Connection Error ❌:';
        process.exit(1);
    }
})();


app.get('/', (req, res) => {
    res.send(test);

});

app.post('/signup', (req, res) => {
    const message = req.body;
    res.send(`Gotten the data needed ${message.fname}`);
});

app.listen(3000, () => {});