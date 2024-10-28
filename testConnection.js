// testConnection.js
const connection = require('./db'); // Asegúrate de que db.js esté en la misma carpeta

// Intenta obtener una conexión a la base de datos
connection.getConnection()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err);
    });
