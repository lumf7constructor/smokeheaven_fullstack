import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/api/Products';
import Cigarettes from './pages/Cigarettes';
import LightCigarettes from './pages/LightCigarettes';
import HeavyCigarettes from './pages/HeavyCigarettes';
import Vapes from './pages/Vapes';
import ReusableVapes from './pages/ReusableVapes';
import DisposableVapes from './pages/DisposableVapes';
import Hookahs from './pages/Hookahs';
import Contact from './pages/Contact';
import Review from './pages/Review';
import Cart from './pages/Cart';
import MyCart from './pages/MyCart';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TokenManager from './components/TokenManager'; // Add TokenManager

function App() {
  return (
    <Router>
      <TokenManager /> {/* Token cleanup logic */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/cigarettes" element={<Cigarettes />} />
        <Route path="/products/cigarettes/light" element={<LightCigarettes />} />
        <Route path="/products/cigarettes/heavy" element={<HeavyCigarettes />} />
        <Route path="/products/vapes" element={<Vapes />} />
        <Route path="/products/vapes/reusable" element={<ReusableVapes />} />
        <Route path="/products/vapes/disposable" element={<DisposableVapes />} />
        <Route path="/products/hookahs" element={<Hookahs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/review" element={<Review />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
