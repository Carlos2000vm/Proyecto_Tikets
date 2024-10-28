// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db'); // Asegúrate de que ./db.js esté configurado para conectar con MySQL

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
