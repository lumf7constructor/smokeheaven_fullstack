import React, { useEffect, useState } from 'react';
import './Vapes.css';

function ReusableVapes() {
  const [reusableVapes, setReusableVapes] = useState([]);

  useEffect(() => {
    const fetchReusableVapes = async () => {
      try {
        const response = await fetch('/api/reusable-vapes');
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the fetched data
        
        const vapesWithImages = data.map(product => ({
          ...product,
          image: getImageForReusableVape(product.Name),
        }));
  
        console.log('Vapes with images:', vapesWithImages); // Log the vapes with images
        setReusableVapes(vapesWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchReusableVapes();
  }, []);
  


  // Function to assign images based on product name
  const getImageForReusableVape = (productName) => {
    switch (productName) {
      case 'Voopoo Drag X':
        return 'voopoo-drag-x.png';
      case 'SMOK Nord 4':
        return 'smok-nord-4.jpg';
      case 'GeekVape Aegis X':
        return 'geekvape-aegis-x.jpeg';
      default:
        return 'default_image.jpg';  // Fallback image for unknown product
    }
  };

  const addToCart = async (product) => {
    try {
      const price = parseFloat(product.Price);
      if (isNaN(price)) {
        console.error('Invalid price:', product.Price);
        return;
      }
  
      // Ensure the product is added to the cart
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const existingProductIndex = cart.findIndex(item => item.productId === product.ProductID);
      if (existingProductIndex >= 0) {
        // Increase the quantity if the product is already in the cart
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new product to the cart
        cart.push({
          productId: product.ProductID,
          name: product.Name,
          price: price,
          quantity: 1,
          image: product.image,
        });
      }
  
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert(`${product.Name} added to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart');
    }
  };

  return (
    <div className="vape-container">
      <h2>Reusable Vapes</h2>
      <div className="vape-grid">
        {reusableVapes.length === 0 ? (
          <p>No products found.</p> // Message if no data is loaded
        ) : (
          reusableVapes.map(product => (
            <div key={product.ProductID} className="vape-card">
              <img src={`/images/${product.image}`} alt={product.Name} className="vape-image" />
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

export default ReusableVapes;
