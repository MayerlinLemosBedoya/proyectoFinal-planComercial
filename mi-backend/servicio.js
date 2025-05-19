const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/procesar-formulario', (req, res) => {
    const { nombres, apellidos, correo, texto } = req.body;
    if (!nombres || !apellidos || !correo || !texto) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    console.log('Formulario recibido:', req.body);
    res.send('¡Formulario enviado correctamente!');
});

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

