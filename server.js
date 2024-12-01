const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // import CORS
const crypto = require('crypto'); // import crypto for password hashing

const app = express();
const port = 3002;
const { parse } = require('json2csv');  // Import json2csv's parse function
const fs = require('fs');
const path = require('path');


// Apply middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies


// Middleware to log requests to any route
app.use((req, res, next) => {
  const { method, url, headers } = req;
  const ip = req.ip || req.connection.remoteAddress;  // Get the IP address of the client
  const userAgent = headers['user-agent'];  // Get the User-Agent string from the headers

  // SQL query to insert the request log into the database
  const query = `
      INSERT INTO RequestLog (Method, URL, IP, Browser, Timestamp)
      VALUES (?, ?, ?, ?, NOW())
  `;

  // Execute the query to insert the data into the database
  db.query(query, [method, url, ip, userAgent], (err) => {
      if (err) {
          console.error('Error logging request:', err);
      }
  });

  // Pass control to the next middleware or route handler
  next();
});

// Middleware to log errors
app.use((err, req, res, next) => {
  const { method, url } = req;
  const ip = req.ip || req.connection.remoteAddress;

  const query = `
      INSERT INTO ErrorLog (Method, URL, IP, ErrorMessage, Timestamp)
      VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(query, [method, url, ip, err.message], (dbErr) => {
      if (dbErr) console.error('Error logging error:', dbErr);
  });

  res.status(500).json({ message: 'An error occurred' });
});


  // Query to fetch all logs from RequestLog table
app.get('/export-request-logs', (req, res) => {
  const query = 'SELECT * FROM RequestLog';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching request logs:', err);
      return res.status(500).json({ message: 'Error fetching request logs' });
    }

    // Convert the query results to CSV
    try {
      const csvData = parse(results);  // Converts the JSON to CSV

      // Define the path for the CSV file
      const filePath = path.join(__dirname, 'exports', 'request_logs.csv');
      
      console.log(`File path for CSV: ${filePath}`);

      // Make sure the "exports" folder exists
      if (!fs.existsSync(path.dirname(filePath))) {
        console.log('Creating exports folder...');
        fs.mkdirSync(path.dirname(filePath));
      }

      // Write the CSV data to the file
      fs.writeFileSync(filePath, csvData);
      console.log('CSV file written successfully.');

      // Send a response indicating the file was created
      res.status(200).json({
        message: 'Request logs exported successfully',
        filePath: filePath
      });
    } catch (error) {
      console.error('Error writing CSV file:', error);
      res.status(500).json({ message: 'Error exporting request logs to CSV' });
    }
  });
});


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

app.get('/api/products/search', (req, res) => {
  const { productType, brand } = req.query;

  if (!productType || !brand) {
    return res.status(400).json({ message: 'Product type and brand query parameters are required' });
  }

  let query = '';
  let searchPattern = `%${brand.toLowerCase()}%`;

  switch (productType) {
    case 'Cigarette':
      // Query both LightCigarettes and HeavyCigarettes using LOWER() to ensure a case-insensitive match
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

app.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM `Order`';
  db.query(query, (err, results) => {
    if (err) {
      console.log('Error fetching orders:', err);
      res.status(500).send('Error fetching orders');
    } else {
      // Safely parse Products, handling NULL or invalid JSON cases
      const ordersWithProducts = results.map(order => ({
        ...order,
        Products: order.Products ? JSON.parse(order.Products) : [] // Default to an empty array if NULL
      }));

      res.json(ordersWithProducts);
    }
  });
});



// Assuming you are using Express.js
app.post('/api/submitorder', (req, res) => {
  const { customerID, orderDate, products, totalAmount, address } = req.body;

  // SQL query to insert the order, with status always set to "Placed"
  const insertOrderQuery = `
    INSERT INTO \`Order\` (OrderDate, TotalAmount, ShippingAddress, Status, CustomerID, Products)
    VALUES (?, ?, ?, 'Placed', ?, ?)
  `;

  // Convert products array to JSON
  const productsJSON = JSON.stringify(products);

  // Insert the order into the database
  db.query(insertOrderQuery, [orderDate, totalAmount, address, customerID, productsJSON], (err, result) => {
    if (err) {
      console.error('Error inserting order into database:', err);
      return res.status(500).json({ message: 'Error inserting order into database' });
    }

    // Return success response with the OrderID (which will be auto-generated by the database)
    res.status(200).json({
      message: 'Order submitted successfully',
      orderID: result.insertId, // This will give the automatically generated OrderID
    });
  });
});


// Now, the following route would log each access to /products
app.get('/products', (req, res) => {
// Your actual route logic here
res.send('Products page');
});


// Get statistics from logs
app.get('/api/logs/statistics', (req, res) => {
  const query = `
      SELECT URL, IP, Browser, COUNT(*) AS AccessCount, MIN(Timestamp) AS FirstAccess, MAX(Timestamp) AS LastAccess
      FROM RequestLog
      GROUP BY URL, IP, Browser
      ORDER BY AccessCount DESC
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching statistics:', err);
          return res.status(500).json({ message: 'Error fetching statistics' });
      }
      res.json(results);
  });
});

// Get timeline of errors
app.get('/api/logs/errors', (req, res) => {
  const query = `
      SELECT URL, IP, ErrorMessage, Timestamp
      FROM ErrorLog
      ORDER BY Timestamp DESC
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching errors:', err);
          return res.status(500).json({ message: 'Error fetching errors' });
      }
      res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

