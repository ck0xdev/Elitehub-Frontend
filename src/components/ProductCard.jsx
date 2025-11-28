import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  
  // Check if item is in wishlist
  const isWishlisted = user?.wishlist?.some(item => (item._id === product.id || item === product.id));

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) return alert("Please Login to use Wishlist");

    let newWishlist;
    if (isWishlisted) {
        // Remove
        newWishlist = user.wishlist.filter(item => (item._id || item) !== product.id);
    } else {
        // Add
        newWishlist = [...(user.wishlist || []), product.id];
    }
    dispatch(updateUserAsync({ id: user.id, wishlist: newWishlist }));
  };

  return (
    <motion.div whileHover={{ y: -10 }} className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Link to={`/product-detail/${product.id}`} className="flex flex-col h-full">
        {product.isNew && <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">NEW</div>}
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-md transition-all hover:scale-110 ${isWishlisted ? 'bg-pink-50 text-pink-600' : 'bg-white text-gray-400 hover:text-pink-500'}`}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <div className="h-64 bg-gray-50 flex items-center justify-center p-6 relative">
          <motion.img 
            whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}
            src={`/uploads/${product.avatar}`} alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300?text=No+Image"; }} 
          />
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium text-gray-500">{product.rating || 4.5}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={product.title}>{product.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{product.category || 'Electronics'}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            {/* FIXED: Currency to Rupee */}
            <span className="text-xl font-bold text-indigo-600">₹{product.price}</span>
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