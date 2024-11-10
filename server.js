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

// After your other routes in server.js
app.post('/api/reviews', (req, res) => {
  const { rating, comment, productId } = req.body;
  const date = new Date(); // Get the current date

  const query = 'INSERT INTO Review (Rating, Comment, Date, ProductID) VALUES (?, ?, ?, ?)';
  db.query(query, [rating, comment, date, productId], (err, results) => {
      if (err) {
          console.error('Error inserting review:', err);
          return res.status(500).json({ message: 'Error adding review' });
      }
      res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
  });
});

app.get('/api/light-cigarettes', (req, res) => {
  const query = 'SELECT * FROM LightCigarettes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json(results);  // Send data as JSON
  });
});

// Route for fetching heavy cigarettes
app.get('/api/heavy-cigarettes', (req, res) => {
  const query = 'SELECT * FROM HeavyCigarettes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json(results);  // Send data as JSON
  });
});

// Route to get hookahs from the database
app.get('/api/hookahs', (req, res) => {
  const query = 'SELECT ProductID, Name, Price FROM Hookah';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hookahs:', err);
      res.status(500).json({ error: 'Failed to fetch hookahs' });
    } else {
      res.json(results); // Send hookah data to the frontend
    }
  });
});

// Route to get resusable vapes from the database
app.get('/api/reusable-vapes', (req, res) => {
  const query = 'SELECT ProductID, Name, Price FROM ReusableVape';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching vapes:', err);
      res.status(500).json({ error: 'Failed to fetch vapes' });
    } else {
      res.json(results); // Send vape data to the frontend
    }
  });
});

// Route to get disposable vapes from the database
app.get('/api/disposable-vapes', (req, res) => {
  const query = 'SELECT ProductID, Name, Price FROM DisposableVape';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching vapes:', err);
      res.status(500).json({ error: 'Failed to fetch vapes' });
    } else {
      res.json(results); // Send vape data to the frontend
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

