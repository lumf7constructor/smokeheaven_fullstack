import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Your CSS file

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    console.log(isMenuOpen); // Debugging line
  };

  return (
    <nav>
      <div className="logo">
        <img src="logo-black.png" alt="logo" />
        <h1>Smoke Heaven</h1>
      </div>
      <div className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`} onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        <li><Link to="/review" onClick={() => setMenuOpen(false)}>Review</Link></li>
        <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Orders</Link></li>
        <li><Link to="/mycart" onClick={() => setMenuOpen(false)}>
          <img src="/images/cart.png" alt="Cart" style={{ width: '24px', height: '24px' }} />
        </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
