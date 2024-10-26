import React from 'react';
import './Cigarettes.css';

const lightCigarettes = [
  {
    id: 1,
    name: 'Marlboro White',
    price: 9.99,
    description: 'Smooth and light, perfect for a relaxing smoke.',
    image: 'malborowhite.jpeg',
  },
  {
    id: 2,
    name: 'Camel',
    price: 8.99,
    description: 'Rich flavor with a classic blend.',
    image: 'camel.jpg',
  },
  {
    id: 3,
    name: 'Jet',
    price: 7.99,
    description: 'A bold flavor experience.',
    image: 'jet.jpg',
  },
];

function LightCigarettes() {
  const addToCart = async (product) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert(`${product.name} added to cart successfully!`);
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart');
    }
  };

  return (
    <div className="cigarette-container">
      <h2>Light Cigarettes</h2>
      <div className="cigarette-grid">
        {lightCigarettes.map(product => (
          <div key={product.id} className="cigarette-card">
            <img src={`/images/${product.image}`} alt={product.name} className="cigarette-image" />
            <h3 className="cigarette-name">{product.name}</h3>
            <p className="cigarette-description">{product.description}</p>
            <p className="cigarette-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LightCigarettes;
