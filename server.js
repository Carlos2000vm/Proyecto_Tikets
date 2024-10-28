const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connection = require('./db'); // Asegúrate de que este archivo esté bien configurado

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Aquí puedes agregar tu lógica para autenticar al usuario
    try {
        // Ejemplo de consulta a la base de datos
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await connection.execute(query, [email]);

        if (rows.length > 0) {
            // Aquí puedes agregar la lógica de comparación de contraseñas
            // Por ejemplo usando bcrypt para comparar las contraseñas
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).send('Error del servidor');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
