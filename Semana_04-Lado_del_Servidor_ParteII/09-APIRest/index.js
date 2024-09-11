import express from 'express';
import fs from 'fs';

const port = 3000;
const app = express();
app.use(express.json());

app.get('/automoviles', (req, res) => {

    fs.readFile('./data/automoviles.json', (err, data) => {
        if (err) {
            console.log(err);
            throw new Exception(err);
        }

        let automoviles = JSON.parse(data);

        res.json(automoviles);
    });
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))