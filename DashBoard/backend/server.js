const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());  // Use CORS middleware

const db = mysql.createConnection({
    host: 'localhost',
    user: 'arduino',
    password: 'password',
    database: 'sensors'
});

db.connect();

app.get('/latest-temperature', (req, res) => {
    db.query('SELECT Temp, Datum FROM temperatur ORDER BY Datum DESC LIMIT 1', (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
