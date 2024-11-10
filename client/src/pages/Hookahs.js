import React, { useEffect, useState } from 'react';
import './Products.css'; // Make sure this file exists

function Hookahs() {
  const [hookahs, setHookahs] = useState([]);

  // Fetch hookahs data from the backend API
  useEffect(() => {
    const fetchHookahs = async () => {
      try {
        const response = await fetch('/api/hookahs');
        const data = await response.json();
        console.log('Fetched hookahs data:', data); // Log the fetched data
        
        // Check if the data is empty
        if (data.length === 0) {
          console.log('No hookahs found.');
        }

        // Add images to the products based on the name (if necessary)
        const hookahsWithImages = data.map(product => ({
          ...product,
          image: getImageForProduct(product.Name),
        }));

        setHookahs(hookahsWithImages);
      } catch (error) {
        console.error('Error fetching hookahs:', error);
      }
    };

    fetchHookahs();
  }, []);

  // Function to assign images based on product name
  const getImageForProduct = (productName) => {
    switch (productName) {
      case 'Khalil Mamoon Classic':
        return 'khalil_mamoon_classic.jpg';
      case 'Starbuzz Blue Mist Bowl':
        return 'starbuzz_blue_mist.jpg';
      case 'Fumari Watermelon Bowl':
        return 'fumari_watermelon.jpg';
      case 'Al Fakher Mint Bowl':
        return 'al_fakher_mint.jpg';
      default:
        return 'default_image.jpg'; // Fallback image
    }
  };

  // Function to handle adding a product to the cart
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
          quantity: 1, // Assuming 1 for now; this can be adjusted
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
    <div className="products-container">
      <h2>Hookahs</h2>
      <div className="product-grid">
        {hookahs.length === 0 ? (
          <p>No products found.</p> // Message if no data is loaded
        ) : (
          hookahs.map(product => (
            <div key={product.ProductID} className="product-card">
              <img src={`/images/${product.image}`} alt={product.Name} className="product-image" />
              <h3 className="product-name">{product.Name}</h3>
              <p className="product-price">${Number(product.Price).toFixed(2)}</p>
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

export default Hookahs;
