import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileAsync, selectLoggedInUser } from './features/auth/authSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import UserProfile from './pages/UserProfile'; // NEW
import NewArrivals from './pages/NewArrivals'; // NEW

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfileAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/new-arrivals" element={<NewArrivals />} /> {/* NEW */}
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/profile" element={<UserProfile />} /> {/* NEW */}
      </Routes>
    </div>
  );
}
export default App;