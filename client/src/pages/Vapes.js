import React from 'react';
import './Products.css'; // Import your CSS styles

const vapes = [
  {
    id: 1,
    name: 'Classic Vape Pen',
    price: 19.99,
    stock: 30,
    image: 'classic-vape.jpg',
  },
  {
    id: 2,
    name: 'Berry Bliss Pod',
    price: 14.99,
    stock: 25,
    image: 'berry-bliss.jpg',
  },
  {
    id: 3,
    name: 'Mint Chill Device',
    price: 22.99,
    stock: 15,
    image: 'mint-chill.jpg',
  },
  {
    id: 4,
    name: 'Tropical Fusion Kit',
    price: 29.99,
    stock: 20,
    image: 'tropical-fusion.jpg',
  },
  {
    id: 5,
    name: 'Watermelon Wave',
    price: 16.99,
    stock: 12,
    image: 'watermelon-wave.jpg',
  },
  {
    id: 6,
    name: 'Citrus Zing Vape',
    price: 18.99,
    stock: 10,
    image: 'citrus-zing.jpg',
  },
  {
    id: 7,
    name: 'Vanilla Cream Vape',
    price: 21.99,
    stock: 18,
    image: 'vanilla-cream.jpg',
  },
  {
    id: 8,
    name: 'Chocolate Mint Pod',
    price: 19.49,
    stock: 8,
    image: 'chocolate-mint.jpg',
  },
  {
    id: 9,
    name: 'Cool Menthol Device',
    price: 17.99,
    stock: 22,
    image: 'cool-menthol.jpg',
  },
  {
    id: 10,
    name: 'Pineapple Paradise',
    price: 25.99,
    stock: 5,
    image: 'pineapple-paradise.jpg',
  },
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

export default Vapes;
