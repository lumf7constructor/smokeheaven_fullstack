import React from 'react';
import './Cigarettes.css'; // Ensure this path is correct

function Cigarettes() {
  return (
    <div className="product-container">
      <h2>Cigarettes</h2>
      <div className="product-grid">
        <div className="product-card">
          <img src="/images/malborowhite.jpeg" alt="Marlboro White" className="product-image" />
          <h3 className="product-name">Marlboro White</h3>
          <p className="product-description">Smooth and light, perfect for a relaxing smoke.</p>
          <p className="product-price">$9.99</p>
        </div>

        <div className="product-card">
          <img src="/images/camel.jpg" alt="Camel" className="product-image" />
          <h3 className="product-name">Camel</h3>
          <p className="product-description">Rich flavor with a classic blend.</p>
          <p className="product-price">$8.99</p>
        </div>

        <div className="product-card">
          <img src="/images/american-spirit.jpg" alt="American Spirit" className="product-image" />
          <h3 className="product-name">American Spirit</h3>
          <p className="product-description">Organic tobacco for a cleaner smoke.</p>
          <p className="product-price">$10.99</p>
        </div>

        <div className="product-card">
          <img src="/images/jet.jpg" alt="Jet" className="product-image" />
          <h3 className="product-name">Jet</h3>
          <p className="product-description">A bold flavor experience.</p>
          <p className="product-price">$7.99</p>
        </div>

        <div className="product-card">
          <img src="/images/black-cigarettes.jpg" alt="Black Cigarettes" className="product-image" />
          <h3 className="product-name">Black Cigarettes</h3>
          <p className="product-description">For those who prefer a richer taste.</p>
          <p className="product-price">$11.99</p>
        </div>
      </div>
    </div>
  );
}

export default Cigarettes;
