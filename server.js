const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) throw err;
        res.send('User created...');
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get single user
app.get('/api/users/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update user
app.put('/api/users/:id', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql, [name, email, password, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User updated...');
    });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User deleted...');
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});


