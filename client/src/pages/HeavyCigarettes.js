import React, { useEffect, useState } from 'react';
import './Cigarettes.css';

function HeavyCigarettes() {
  const [heavyCigarettes, setHeavyCigarettes] = useState([]);

  useEffect(() => {
    const fetchHeavyCigarettes = async () => {
      try {
        const response = await fetch('/api/heavy-cigarettes');
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the fetched data
        
        // Check if the data is empty
        if (data.length === 0) {
          console.log('No products found.');
        }

        // Add images to the products based on the name (you can adjust this logic)
        const cigarettesWithImages = data.map(product => ({
          ...product,
          image: getImageForProduct(product.Name),
        }));

        setHeavyCigarettes(cigarettesWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHeavyCigarettes();
  }, []);


  // Function to assign images based on product name
  const getImageForProduct = (productName) => {
    switch (productName) {
      case 'Camel Blue':
        return 'camel-blue.jpg';
      case 'Lucky Strike Original':
        return 'lucky-strike.jpg';
      case 'Pall Mall Red':
        return 'pall-mall-red.jpg';
      case 'Winston Gold':
        return 'winston-gold.jpg';
      case 'Dunhill International':
        return 'dunhill-international.jpg';
      default:
        return 'default_image.jpg';  // Fallback image
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
    <div className="cigarette-container">
      <h2>Heavy Cigarettes</h2>
      <div className="cigarette-grid">
        {heavyCigarettes.length === 0 ? (
          <p>No products found.</p> // Message if no data is loaded
        ) : (
          heavyCigarettes.map(product => (
            <div key={product.ProductID} className="cigarette-card">
              <img src={`/images/${product.image}`} alt={product.Name} className="cigarette-image" />
              <h3 className="cigarette-name">{product.Name}</h3>
              <p className="cigarette-price">${isNaN(Number(product.Price)) ? 'N/A' : Number(product.Price).toFixed(2)}</p>
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

export default HeavyCigarettes;
