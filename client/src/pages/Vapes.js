import React from 'react';
import { Link } from 'react-router-dom';
import './Vapes.css';

function Vapes() {
  return (
    <div className="vape-container">
      <h2>Vapes</h2>
      <div className="product-options">
        <Link to="/products/vapes/reusable" className="product-option">
          <h3>Reusable Vapes</h3>
          <img src="/images/smok-nord-4.jpg" alt="Reusable Vapes" className="option-image" />
        </Link>
        <Link to="/products/vapes/disposable" className="product-option">
          <h3>Disposable Vapes</h3>
          <img src="/images/geek-bar.jpg" alt="Disposable Vapes" className="option-image" />
        </Link>
      </div>
    </div>
  );
}
export default Vapes;
