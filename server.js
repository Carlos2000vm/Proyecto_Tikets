const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'ticket_eventos_db'
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { mail, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [mail], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado.' });
    }

    const user = results[0];

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar la contraseña.' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
      }

      // Generar un token si la autenticación es exitosa
      const token = jwt.sign({ id: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });
      res.json({ token, user });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
