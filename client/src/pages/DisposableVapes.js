import React, { useEffect, useState } from 'react';
import './Vapes.css';

function DisposableVapes() {
  const [disposableVapes, setDisposableVapes] = useState([]);

  useEffect(() => {
    const fetchDisposableVapes = async () => {
      try {
        const response = await fetch('/api/disposable-vapes');
        const data = await response.json();
        console.log('Fetched disposable vapes data:', data); // Log data
  
        if (data.length === 0) {
          console.log('No disposable products found.');
        }
  
        // Add images to the products based on the name
        const vapesWithImages = data.map(product => ({
          ...product,
          image: getImageForDisposableVape(product.Name),
        }));
  
        setDisposableVapes(vapesWithImages);
      } catch (error) {
        console.error('Error fetching disposable vapes:', error);
      }
    };
  
    fetchDisposableVapes();
  }, []);
  


  // Function to assign images based on product name
  const getImageForDisposableVape = (productName) => {
    switch (productName) {
      case 'Geek Bar':
        return 'geek-bar.jpg';
      case 'Elf Bar':
        return 'elf-bar.jpeg';
      case 'Air Bar Max':
        return 'air-bar-max.jpeg';
      default:
        return 'default_image.jpg';  // Fallback image for unknown product
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.ProductID,
          name: product.Name,
          price: product.Price,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert(`${product.Name} added to cart successfully!`);
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart');
    }
  };

  return (
    <div className="vape-container">
  <h2>Disposable Vapes</h2>
  <div className="vape-grid">
    {disposableVapes.length === 0 ? (
      <p>No products found.</p> // Message if no data is loaded
    ) : (
      disposableVapes.map(product => (
        <div key={product.ProductID} className="vape-card">
          <img
            src={`/images/${product.image}`} 
            alt={product.Name} 
            className="vape-image" 
          />
          <h3 className="vape-name">{product.Name}</h3>
          <p className="vape-price">${isNaN(Number(product.Price)) ? 'N/A' : Number(product.Price).toFixed(2)}</p>
          <button className="add-to-cart-button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))
    )}
  </div>
</div>

  );
}

export default DisposableVapes;
