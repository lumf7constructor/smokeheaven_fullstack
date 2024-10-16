import React from 'react';
import './Home.css'; // Custom CSS for the home page

function Home() {
  return (
    <div className="home-container">
      <div className="logo-section">
        <img src="/logo-black.png" alt="Smoke Heaven" className="logo" />
      </div>
      <h1>Welcome to Smoke Heaven</h1>
      <p>Browse our wide variety of smoking products.</p>
      <div className="products-button">
        <a href="/products" className="btn">Explore Products</a>
      </div>
    </div>
  );
}

export default Home;
