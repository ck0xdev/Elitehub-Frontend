import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';  // <--- IMPORT FROM PAGES
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';  // <--- IMPORT FROM PAGES

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;