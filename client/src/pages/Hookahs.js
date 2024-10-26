import React from 'react';
import './Products.css'; // Import your CSS styles

const hookahs = [
  {
    id: 1,
    name: 'Classic Hookah',
    price: 39.99,
    stock: 15,
    image: 'classic-hookah.jpg',
  },
  {
    id: 2,
    name: 'Modern Glass Hookah',
    price: 79.99,
    stock: 10,
    image: 'modern-glass-hookah.jpg',
  },
  {
    id: 3,
    name: 'Mini Hookah',
    price: 29.99,
    stock: 20,
    image: 'mini-hookah.jpg',
  },
  {
    id: 4,
    name: 'Luxury Hookah Set',
    price: 149.99,
    stock: 5,
    image: 'luxury-hookah-set.jpg',
  },
  {
    id: 5,
    name: 'Portable Hookah',
    price: 59.99,
    stock: 12,
    image: 'portable-hookah.jpg',
  },
];

function Hookahs() {
  // Function to handle adding a product to the cart
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
          quantity: 1, // Assuming 1 for now; this can be adjusted
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
    <div className="products-container">
      <h2>Hookahs</h2>
      <div className="product-grid">
        {hookahs.map(product => (
          <div key={product.id} className="product-card">
            <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hookahs;
