const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // import CORS
const crypto = require('crypto'); // import crypto for password hashing

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

// Helper function to hash passwords
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

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

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;


  // Check the database for the user
  const query = 'SELECT * FROM Account WHERE email = ? AND PasswordHash = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a simple token (replace this with a more secure solution for production)
    const token = `${username}-auth-token`;
    res.status(200).json({ token });
  });
});

// Protect orders route
app.get('/api/orders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || !token.endsWith('-auth-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Fetch orders from the database
  const query = 'SELECT * FROM `Order`';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Error fetching orders');
    }

    // Ensure the backend does not parse the Products field
    const orders = results.map((order) => ({
      ...order,
      Products: order.Products || null, // Pass Products as-is (string or null)
    }));

    res.json(orders); // Send orders to the frontend
  });
});



// API route to submit reviews
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

// Routes for fetching products
app.get('/api/light-cigarettes', (req, res) => {
  const query = 'SELECT * FROM LightCigarettes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json(results); // Send data as JSON
  });
});

app.get('/api/heavy-cigarettes', (req, res) => {
  const query = 'SELECT * FROM HeavyCigarettes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json(results); // Send data as JSON
  });
});

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

app.get('/api/products/search', (req, res) => {
  const { productType, brand } = req.query;

  if (!productType || !brand) {
    return res.status(400).json({ message: 'Product type and brand query parameters are required' });
  }

  let query = '';
  let searchPattern = `%${brand.toLowerCase()}%`;

  switch (productType) {
    case 'Cigarette':
      query = `
        SELECT ProductID, 'Light' AS Category, Name, Price FROM LightCigarettes WHERE LOWER(Name) LIKE ?
        UNION
        SELECT ProductID, 'Heavy' AS Category, Name, Price FROM HeavyCigarettes WHERE LOWER(Name) LIKE ?
      `;
      break;
    case 'Hookah':
      query = `SELECT ProductID, Brand, Name, Flavor, Price FROM Hookah WHERE LOWER(Brand) LIKE ?`;
      break;
    case 'ReusableVape':
      query = `SELECT ProductID, Name, NumberOfPuffs, Price FROM ReusableVape WHERE LOWER(Name) LIKE ?`;
      break;
    case 'DisposableVape':
      query = `SELECT ProductID, Name, LastingTime, Price FROM DisposableVape WHERE LOWER(Name) LIKE ?`;
      break;
    default:
      return res.status(400).json({ message: 'Invalid product type' });
  }

  db.query(query, [searchPattern, searchPattern], (err, results) => {
    if (err) {
      console.error('Error searching for product:', err);
      return res.status(500).json({ message: 'Error searching for product' });
    }
    res.json(results);
  });
});

// Endpoint to submit orders
app.post('/api/submitorder', (req, res) => {
  const { customerID, orderDate, products, totalAmount, address } = req.body;

  const insertOrderQuery = `
    INSERT INTO \`Order\` (OrderDate, TotalAmount, ShippingAddress, Status, CustomerID, Products)
    VALUES (?, ?, ?, 'Placed', ?, ?)
  `;

  const productsJSON = JSON.stringify(products);

  db.query(insertOrderQuery, [orderDate, totalAmount, address, customerID, productsJSON], (err, result) => {
    if (err) {
      console.error('Error inserting order into database:', err);
      return res.status(500).json({ message: 'Error inserting order into database' });
    }

    res.status(200).json({
      message: 'Order submitted successfully',
      orderID: result.insertId,
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
