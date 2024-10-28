// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Asegúrate de que dotenv esté instalado

// Crea una conexión a la base de datos utilizando variables de entorno
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = connection;

// DB_HOST=localhost
/*
DB_HOST=localhost
DB_USER=user
DB_PASS=admin
DB_NAME=ticket_eventos_db
JWT_SECRET=1234
*/