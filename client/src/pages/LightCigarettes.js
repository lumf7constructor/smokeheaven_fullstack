import React, { useEffect, useState } from 'react';
import './Cigarettes.css';

function LightCigarettes() {
  const [lightCigarettes, setLightCigarettes] = useState([]);

  useEffect(() => {
    const fetchLightCigarettes = async () => {
      try {
        const response = await fetch('/api/light-cigarettes');
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the fetched data
        
        if (data.length === 0) {
          console.log('No products found.');
        }

        // Add images to the products
        const cigarettesWithImages = data.map(product => ({
          ...product,
          image: getImageForProduct(product.Name),
        }));

        setLightCigarettes(cigarettesWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLightCigarettes();
  }, []);

  // Function to assign images based on product name
  const getImageForProduct = (productName) => {
    switch (productName) {
      case 'Marlboro Light Pack':
        return 'malborowhite.jpeg';
      case 'American Spirit Yellow':
        return 'american_spirit_yellow.jpg';
      case 'Benson & Hedges Gold':
        return 'benson_hedges_gold.jpg';
      case 'Virginia Slims Menthol':
        return 'virginia_slims_menthol.jpg';
      case 'Newport Menthol 100s':
        return 'newport_menthol_100s.jpg';
      default:
        return 'default_image.jpg';
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
    <div className="cigarette-container">
      <h2>Light Cigarettes</h2>
      <div className="cigarette-grid">
        {lightCigarettes.length === 0 ? (
          <p>No products found.</p>
        ) : (
          lightCigarettes.map(product => (
            <div key={product.ProductID} className="cigarette-card">
              <img src={`/images/${product.image}`} alt={product.Name} className="cigarette-image" />
              <h3 className="cigarette-name">{product.Name}</h3>
              <p className="cigarette-price">${Number(product.Price).toFixed(2)}</p>
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

export default LightCigarettes;
