const express = require('express');
const app = require('./app'); // Importa app.js, donde está la lógica de las rutas
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
