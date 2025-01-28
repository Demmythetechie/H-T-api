import e from "express";
const app = e();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/signup', (req, res) => {
    const message = req.body;
    res.send(`Gotten the data needed ${message}`);
});

app.listen(3000, () => {
    console.log(`App listening at http://localhost:${4000}`);
});