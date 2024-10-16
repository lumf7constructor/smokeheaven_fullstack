import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Import custom CSS for styling

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Cigarette',
      price: 9.99,
      stock: 50,
      image: 'malborowhite.jpeg', // Make sure to have a placeholder image in the public/images folder
    },
    {
      id: 2,
      name: 'Vape',
      price: 9.99,
      stock: 50,
      image: 'test-cigarette.jpg', // Make sure to have a placeholder image in the public/images folder
    },
  ]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      {products.length ? (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Products;
