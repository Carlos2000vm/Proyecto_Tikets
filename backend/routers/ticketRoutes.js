const express = require('express');
const router = express.Router();
const db = require('../../funciones');

router.post('/comprar-tickets', (req, res) => {
    const { evento, cantidad } = req.body;

    db.query('INSERT INTO tickets (evento, cantidad) VALUES (?, ?)', [evento, cantidad], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al procesar la compra' });
        }
        res.json({ message: `Compra exitosa de ${cantidad} ticket(s) para ${evento}` });
    });
});

module.exports = router;
