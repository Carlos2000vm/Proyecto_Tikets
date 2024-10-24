const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos

app.post('/api/comprar-tickets', (req, res) => {
    const { evento, cantidad } = req.body;
    
    // Lógica para guardar la compra en la base de datos aquí

    res.json({ message: `Compra exitosa de ${cantidad} ticket(s) para ${evento}` });
});

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
