import e from "express";
import cors from "cors";
const app = e();
const rules = cors();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/signup', (req, res) => {
    const message = req.body.data;
    res.send(`Gotten the data needed ${message}`);
});

app.listen(3000, () => {});