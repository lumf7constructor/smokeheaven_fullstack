import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Products.css'; // Import custom CSS for styling

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        <Link to="/products/cigarettes" className="product-card">
          <img src="/images/malborowhite.jpeg" alt="Cigarettes" className="product-image" />
          <h3 className="product-name">Cigarettes</h3>
        </Link>

        <Link to="/products/vapes" className="product-card">
          <img src="/images/test-cigarette.jpg" alt="Vapes" className="product-image" />
          <h3 className="product-name">Vapes</h3>
        </Link>

        <Link to="/products/hookahs" className="product-card">
          <img src="/images/hookah.jpg" alt="Hookahs" className="product-image" />
          <h3 className="product-name">Hookahs</h3>
        </Link>
      </div>
      {products.length === 0 && <p>No products available</p>}
    </div>
  );
}

export default Products;
