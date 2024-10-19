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
      
      <footer className="footer">
        <p>This website is student lab work and does not necessarily reflect Jacobs University Bremen opinions. Jacobs University Bremen does not endorse this site, nor is it checked by Jacobs University Bremen regularly, nor is it part of the official Jacobs University Bremen web presence.</p>
        <p>For each external link existing on this website, we initially have checked that the target page does not contain contents which is illegal w.r.t. German jurisdiction. However, as we have no influence on such contents, this may change without our notice. Therefore, we deny any responsibility for the websites referenced through our external links from here.</p>
        <p>No information conflicting with GDPR is stored on the server.</p>
      </footer>
    </div>
  );
}

export default Home;
