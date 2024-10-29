const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos (CSS, HTML)

// Conexión a la base de datos
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Verifica la conexión a la base de datos
connection.getConnection()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err);
    });

// Ruta para manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            const user = rows[0];
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                return res.redirect('/index.html'); // Redirige a index.html si las credenciales son correctas
            } else {
                return res.status(401).send('Contraseña incorrecta');
            }
        } else {
            return res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error durante la autenticación:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = app;
