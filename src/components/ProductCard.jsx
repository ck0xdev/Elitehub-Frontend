import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Function to get a random tech image based on ID (so it stays consistent)
  const getOnlineImage = (id) => {
    return `https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=500&auto=format&fit=crop&q=60`; 
    // You can also use specific keywords: https://source.unsplash.com/random/400x400/?electronics
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      <Link to={`/product-detail/${product.id}`} className="flex flex-col h-full">
        
        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
        >
          <Heart size={20} />
        </button>

        {/* Image Area */}
        <div className="h-64 bg-gray-50 flex items-center justify-center p-6 relative">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            // Try local first, then fall back to online
            src={`/uploads/${product.avatar}`} 
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply"
            onError={(e) => { 
              e.target.onerror = null; 
              // Switch to a nice online image if local fails
              e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"; 
            }} 
          />
        </div>

        {/* Content Area */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-500">{product.rating || 4.5}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={product.title}>
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{product.category || 'Electronics'}</p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-indigo-600">${product.price}</span>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-indigo-600 transition-colors">
              <ShoppingCart size={16} /> Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;