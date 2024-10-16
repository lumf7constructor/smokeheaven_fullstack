import React from 'react';
import './Products.css'; // Import your CSS styles

const hookahs = [
  {
    id: 1,
    name: 'Hookah',
    price: 39.99,
    stock: 15,
    image: 'hookah.jpg',
  },
  // Add more hookah products here...
];

function Hookahs() {
  return (
    <div className="products-container">
      <h2>Hookahs</h2>
      <div className="product-grid">
        {hookahs.map(product => (
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

export default Hookahs;
