import e from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = e();
const rules = cors();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(e.json());

mongoose.connect('mongodb+srv://demmythetechie:Alade3015@h-t.8p6yq.mongodb.net/?retryWrites=true&w=majority&appName=H-T', ()=> {
    console.log(Connected)
}, e => console.error(e));


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/signup', (req, res) => {
    const message = req.body;
    res.send(`Gotten the data needed ${message.fname}`);
});

app.listen(3000, () => {});