// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./auth');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Ruta de inicio de sesión
app.post('/login', auth.login);

module.exports = app;
