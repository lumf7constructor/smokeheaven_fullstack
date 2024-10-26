import React from 'react';
import './Cigarettes.css';

const heavyCigarettes = [
  {
    id: 1,
    name: 'Black Cigarettes',
    price: 11.99,
    description: 'For those who prefer a richer taste.',
    image: 'black-cigarettes.jpg',
  },
  {
    id: 2,
    name: 'American Spirit',
    price: 10.99,
    description: 'Organic tobacco for a cleaner smoke.',
    image: 'american-spirit.jpg',
  },
];

function HeavyCigarettes() {
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
      <h2>Heavy Cigarettes</h2>
      <div className="cigarette-grid">
        {heavyCigarettes.map(product => (
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

export default HeavyCigarettes;
