// backend/models/User.js

const db = require('../config/db');

class User {
    static create(email, password, callback) {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, password], (err, results) => {
            callback(err, results);
        });
    }

    static findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            callback(err, results[0]); // Retorna el primer usuario encontrado
        });
    }
}

module.exports = User;
