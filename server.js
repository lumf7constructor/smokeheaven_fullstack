const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // import CORS

const app = express();
const port = 3002;

// Apply middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mern_user',
  password: 'password',
  database: 'mern_db'
});


// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return; // Exit if there's an error connecting
    }
    console.log('Connected to MySQL');
  });
  
  // Example API route
  app.get('/api/test', (req, res) => {
    res.send('MySQL connection is working!');
  });

  // Existing imports and connection code

app.post('/api/reviews', (req, res) => {
  const { productId, comment, rating } = req.body;
  const date = new Date(); // Set the current date

  const query = 'INSERT INTO Review (Rating, Comment, Date, ProductID) VALUES (?, ?, ?, ?)';
  db.query(query, [rating, comment, date, productId], (err, results) => {
      if (err) {
          console.error('Error adding review:', err);
          return res.status(500).json({ message: 'Error adding review.' });
      }
      res.status(201).json({ message: 'Review added successfully!' });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

