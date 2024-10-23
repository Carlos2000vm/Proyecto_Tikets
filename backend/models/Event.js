// backend/models/Event.js

const db = require('../config/db');

class Event {
    static create(name, date, location, ticketsAvailable, callback) {
        const query = 'INSERT INTO events (name, date, location, ticketsAvailable) VALUES (?, ?, ?, ?)';
        db.query(query, [name, date, location, ticketsAvailable], (err, results) => {
            callback(err, results);
        });
    }

    static findAll(callback) {
        const query = 'SELECT * FROM events';
        db.query(query, (err, results) => {
            callback(err, results);
        });
    }
}

module.exports = Event;
