import React from 'react';
import { Link } from 'react-router-dom';
import './Cigarettes.css';

function Cigarettes() {
  return (
    <div className="cigarette-container">
      <h2>Cigarettes</h2>
      <div className="product-options">
        <Link to="/products/cigarettes/light" className="product-option">
          <h3>Light Cigarettes</h3>
          <img src="/images/malborowhite.jpeg" alt="Light Cigarettes" className="option-image" />
        </Link>
        <Link to="/products/cigarettes/heavy" className="product-option">
          <h3>Heavy Cigarettes</h3>
          <img src="/images/black-cigarettes.jpg" alt="Heavy Cigarettes" className="option-image" />
        </Link>
      </div>
    </div>
  );
}

export default Cigarettes;
