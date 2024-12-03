import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]); // Holds the search results
  const [searchTerm, setSearchTerm] = useState('');
  const [productType, setProductType] = useState(''); // Holds the selected product type
  const [isSearching, setIsSearching] = useState(false); // Track if search is active
  const [suggestions, setSuggestions] = useState([]); // Holds suggestions for search

  // Handle search input change and fetch suggestions
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    // Fetch suggestions from the server
    axios
      .get(`http://localhost:3002/api/products/search?productType=${productType}&brand=${encodeURIComponent(term)}`)
      .then((response) => {
        setSuggestions(response.data); // Update suggestions with backend response
      })
      .catch((error) => console.error('Error fetching suggestions:', error));
  };

  // Handle search operation
  const handleSearch = () => {
    if (searchTerm.trim() === '' || productType === '') {
      alert('Please enter a search term and select a product type.');
      return;
    }

    // Send the request to the server with the productType and searchTerm
    axios
      .get(`http://localhost:3002/api/products/search?productType=${productType}&brand=${encodeURIComponent(searchTerm)}`)
      .then((response) => {
        setProducts(response.data);
        setIsSearching(true); // Set searching state to true
        setSuggestions([]); // Clear suggestions
      })
      .catch((error) => console.error('Error searching for product:', error));
  };

  // Handle cancel search operation
  const handleCancelSearch = () => {
    setSearchTerm('');
    setProducts([]);
    setProductType('');
    setIsSearching(false); // Reset searching state
    setSuggestions([]); // Clear suggestions
  };

  // Helper function to get image path based on productType and product details
  const getImagePath = (product) => {
    if (productType === 'Cigarette') {
      switch (product.Name) {
        case 'Marlboro Light Pack':
          return '/images/malborowhite.jpeg';
        case 'American Spirit Yellow':
          return '/images/american_spirit_yellow.jpg';
        case 'Benson & Hedges Gold':
          return '/images/benson_hedges_gold.jpg';
        case 'Virginia Slims Menthol':
          return '/images/virginia_slims_menthol.jpg';
        case 'Newport Menthol 100s':
          return '/images/newport_menthol_100s.jpg';
        default:
          return '/images/default.jpg';
      }
    } else if (productType === 'Hookah') {
      switch (product.Brand) {
        case 'Khalil Mamoon':
          return '/images/khalil_mamoon.jpg';
        case 'Starbuzz':
          return '/images/starbuzz.jpg';
        case 'Fumari':
          return '/images/fumari.jpg';
        case 'Al Fakher':
          return '/images/al_fakher.jpg';
        default:
          return '/images/default.jpg';
      }
    } else if (productType === 'ReusableVape') {
      switch (product.Name) {
        case 'Voopoo Drag X':
          return '/images/voopoo-drag-x.png';
        case 'SMOK Nord 4':
          return '/images/smok-nord-4.jpg';
        case 'GeekVape Aegis X':
          return '/images/geekvape-aegis-x.jpeg';
        default:
          return '/images/default.jpg';
      }
    } else if (productType === 'DisposableVape') {
      switch (product.Name) {
        case 'Geek Bar':
          return '/images/geek-bar.jpg';
        case 'Elf Bar':
          return '/images/elf-bar.jpeg';
        case 'Air Bar Max':
          return '/images/air-bar-max.jpeg';
        default:
          return '/images/default.jpg';
      }
    }
    return '/images/default.jpg'; // Default image if no specific match found
  };

  // Helper to format suggestions with matched text highlighted
  const formatSuggestion = (text, term) => {
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        <strong>{text.slice(0, index + term.length)}</strong>
        <span style={{ opacity: 0.6 }}>{text.slice(index + term.length)}</span>
      </>
    );
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <select value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="">Select Product Type</option>
          <option value="Cigarette">Cigarette</option>
          <option value="Hookah">Hookah</option>
          <option value="ReusableVape">Reusable Vape</option>
          <option value="DisposableVape">Disposable Vape</option>
        </select>

        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter brand or name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.ProductID}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchTerm(suggestion.Name); // Set the suggestion as the search term
                    setSuggestions([]); // Clear suggestions
                  }}
                >
                  {formatSuggestion(suggestion.Name, searchTerm)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={handleSearch}>Search</button>
        {isSearching && (
          <button onClick={handleCancelSearch} className="cancel-search-button">Cancel</button>
        )}
      </div>

      {/* Default Product Categories - Only visible if not searching */}
      {!isSearching && (
        <div className="product-grid">
          <Link to="/products/cigarettes" className="product-card">
            <img src="/images/malborowhite.jpeg" alt="Cigarettes" className="product-image" />
            <h3 className="product-name">Cigarettes</h3>
          </Link>

          <Link to="/products/vapes" className="product-card">
            <img src="/images/Vapes.jpg" alt="Vapes" className="product-image" />
            <h3 className="product-name">Vapes</h3>
          </Link>

          <Link to="/products/hookahs" className="product-card">
            <img src="/images/hookah.jpg" alt="Hookahs" className="product-image" />
            <h3 className="product-name">Hookahs</h3>
          </Link>
        </div>
      )}

      {/* Search Results Section */}
      {isSearching && products.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.ProductID} className="product-card">
                <img src={getImagePath(product)} alt={product.Name} className="product-image" />
                <h3 className="product-name">{product.Name}</h3>
                <p className="product-price">${product.Price}</p>
                <button className="add-to-cart">Add to Cart</button>
                {productType === 'Cigarette' && <p>Category: {product.Category}</p>}
                {productType === 'Hookah' && (
                  <>
                    <p>Flavor: {product.Flavor}</p>
                    <p>Brand: {product.Brand}</p>
                  </>
                )}
                {productType === 'ReusableVape' && <p>Number of Puffs: {product.NumberOfPuffs}</p>}
                {productType === 'DisposableVape' && <p>Lasting Time: {product.LastingTime} mins</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
