import React from 'react';
import './Products.css'; // Import your CSS styles

const vapes = [
  {
    id: 1,
    name: 'Vape',
    price: 19.99,
    stock: 30,
    image: 'test-cigarette.jpg',
  },
  // Add more vape products here...
];

function Vapes() {
  return (
    <div className="products-container">
      <h2>Vapes</h2>
      <div className="product-grid">
        {vapes.map(product => (
          <div key={product.id} className="product-card">
            <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vapes;
