import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cigarettes from './pages/Cigarettes'; // Update this
import Vapes from './pages/Vapes'; // Update this
import Hookahs from './pages/Hookahs';
import Contact from './pages/Contact' // Update this

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/cigarettes" element={<Cigarettes />} />
        <Route path="/products/vapes" element={<Vapes />} />
        <Route path="/products/hookahs" element={<Hookahs />} />
        <Route path="/contact" element={<Contact />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
