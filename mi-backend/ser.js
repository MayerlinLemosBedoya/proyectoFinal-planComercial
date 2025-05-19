const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

app.use(cors()); // Permite peticiones desde otros orígenes
app.use(express.json()); // Para leer JSON desde el cuerpo de la solicitud

app.post("/api/registro", (req, res) => {
    const { nombre, apellidos, correo, contraseña } = req.body;

    if (!nombre || !apellidos || !correo || !contraseña) {
        return res.status(400).json({ mensaje: "Faltan campos" });
    }

    console.log("Datos recibidos:", { nombre, apellidos, correo, contraseña });

    // Aquí podrías guardar los datos en una base de datos

    res.status(200).json({ mensaje: "Registro exitoso" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
