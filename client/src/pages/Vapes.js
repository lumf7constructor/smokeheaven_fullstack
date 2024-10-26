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
      <h2>Vapes</h2>
      <div className="product-grid">
        {vapes.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`/images/Vapes.jpg`} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
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

export default Vapes;
