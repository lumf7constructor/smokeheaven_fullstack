const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mern_user',
  password: 'password',
  database: 'mern_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors());
