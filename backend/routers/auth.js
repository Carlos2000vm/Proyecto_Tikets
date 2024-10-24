// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Ruta para registro
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(email, hashedPassword, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el usuario.' });
        }
        res.status(201).json({ message: 'Usuario creado con éxito.' });
    });
});

// Ruta para inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas.' });

        // Aquí puedes agregar la lógica para generar un token JWT si lo necesitas

        res.json({ message: 'Inicio de sesión exitoso!' });
    });
});

module.exports = router;
