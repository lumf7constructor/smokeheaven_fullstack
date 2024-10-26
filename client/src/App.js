import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cigarettes from './pages/Cigarettes'; // Main Cigarettes page
import LightCigarettes from './pages/LightCigarettes'; // New Light Cigarettes page
import HeavyCigarettes from './pages/HeavyCigarettes'; // New Heavy Cigarettes page
import Vapes from './pages/Vapes';
import Hookahs from './pages/Hookahs';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/cigarettes" element={<Cigarettes />} />
        <Route path="/products/cigarettes/light" element={<LightCigarettes />} />
        <Route path="/products/cigarettes/heavy" element={<HeavyCigarettes />} />
        <Route path="/products/vapes" element={<Vapes />} />
        <Route path="/products/hookahs" element={<Hookahs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
