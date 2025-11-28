import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectItems } from '../features/cart/cartSlice';
import { selectLoggedInUser } from '../features/auth/authSlice'; // Import User Selector

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser); // Get the logged-in user

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo: Abstract Art Style */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-200 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">EliteHub</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Premium Store</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`text-sm font-medium transition-colors ${isActive('/shop') ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Shop
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              New Arrivals
            </Link>
          </div>

          {/* Icons Area */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
              <Search size={22} />
            </button>
            <button className="p-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all">
              <Heart size={22} />
            </button>
            
            {/* Cart Icon with Dynamic Badge */}
            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
              <ShoppingBag size={22} />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute top-1 right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Icon / Profile Logic */}
            {user ? (
               // If Logged In: Show User Initial
               <Link to="/profile" className="hidden sm:flex items-center justify-center w-9 h-9 bg-indigo-600 text-white rounded-full font-bold shadow-md hover:bg-indigo-700 transition-all">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
               </Link>
            ) : (
               // If NOT Logged In: Link to Login Page
               <Link to="/login" className="hidden sm:block p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                  <User size={22} />
               </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Home</Link>
            <Link to="/shop" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Shop</Link>
            {user ? (
                <Link to="/profile" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">My Profile</Link>
            ) : (
                <Link to="/login" className="block px-3 py-3 rounded-lg text-base font-medium text-indigo-600 font-bold hover:bg-indigo-50">Login / Sign Up</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;