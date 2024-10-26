// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors'); // import CORS

// const app = express();
// const port = 3000;

// // Apply middleware
// app.use(cors());
// app.use(express.json()); // Allows parsing of JSON request bodies

// // MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'mern_user',
//   password: 'password',
//   database: 'mern_db'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL');
// });

// // Get all users (sample route)
// app.get('/api/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // Add order (new route)
// app.post('/api/orders', (req, res) => {
//   const { productId, name, price, quantity } = req.body;

//   const query = 'INSERT INTO orders (product_id, product_name, price, quantity) VALUES (?, ?, ?, ?)';
//   db.query(query, [productId, name, price, quantity], (err, result) => {
//     if (err) {
//       console.error('Error inserting order:', err);
//       res.status(500).send('Error inserting order');
//     } else {
//       res.status(201).send('Order added successfully');
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
