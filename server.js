const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // Asegúrate de que esta línea solo aparezca una vez
const cors = require('cors');

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(bodyParser.urlencoded({ extended: true })); // Para datos x-www-form-urlencoded
app.use(bodyParser.json()); // Para datos JSON
app.use(express.static('public')); // Servir archivos estáticos

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.post('/login', (req, res) => {
    const { email, password } = req.body; // Recibe los datos del formulario
    console.log('Datos recibidos:', { email, password });

    // Consulta a la base de datos para verificar el usuario
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error de consulta a la base de datos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            // Comparar la contraseña proporcionada con la almacenada
            if (password === user.password) { // Comparación directa
                // Inicio de sesión exitoso: redirige a index.html
                return res.json({ redirectUrl: '/public/index.html' }); // Enviar URL de redirección
            } else {
                // Credenciales incorrectas
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } else {
            // Credenciales incorrectas
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
});

// Ruta para obtener eventos
app.get('/eventos', (req, res) => {
    const query = 'SELECT * FROM eventos';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener eventos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results); // Envía los eventos como respuesta
    });
});

// Ruta para comprar un ticket
app.post('/comprar', (req, res) => {
    const { id } = req.body; // ID del evento
    const query = 'UPDATE eventos SET boletos_disponibles = boletos_disponibles - 1 WHERE Id = ? AND boletos_disponibles > 0';
    
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al comprar ticket:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Compra exitosa' });
        } else {
            res.status(400).json({ error: 'No hay boletos disponibles' });
        }
    });
});



// Iniciar servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = server; // Exportar el servidor para las pruebas