import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectSelectedProduct, selectProductStatus } from '../features/product/productSlice';
import { selectLoggedInUser } from '../features/auth/authSlice'; // Import User Selector
import { addToCartAsync } from '../features/cart/cartSlice';     // Import Cart Action
import { Star, Truck, ShieldCheck, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectProductStatus);
  const user = useSelector(selectLoggedInUser);

  const [qty, setQty] = useState(1);

  // Fetch product on load
  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    // 1. Check if user is logged in
    if (!user) {
        alert("Please Log In to add items to your cart.");
        navigate('/login');
        return;
    }
    
    // 2. Prepare Item Data
    // Note: ensure your backend expects 'product' and 'user' as IDs
    const cartItem = { 
        product: product.id, 
        user: user.id, // Assuming user object has an .id field
        quantity: qty 
    };

    // 3. Dispatch
    dispatch(addToCartAsync(cartItem));
    alert("Item added to cart successfully!");
  };

  if (status === 'loading') {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  if (!product) {
      return <div className="pt-32 text-center text-xl text-red-500">Product not found.</div>;
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-100 rounded-[2.5rem] p-10 flex items-center justify-center min-h-[500px] relative overflow-hidden group"
        >
          {/* Decorative Blur Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 rounded-full blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>

          <motion.img 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            src={`/uploads/${product.avatar}`} 
            alt={product.title}
            className="w-full max-w-md object-contain drop-shadow-2xl z-10 mix-blend-multiply"
            onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"; 
            }}
          />
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
             <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">
                {product.category || 'Electronics'}
             </span>
             <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
               {product.title}
             </h1>
             <div className="flex items-center gap-2 mt-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.round(product.rating || 4) ? "currentColor" : "none"} />
                    ))}
                </div>
                <span className="text-gray-500 font-medium">({product.rating || 0} Reviews)</span>
             </div>
          </div>

          <div className="text-4xl font-bold text-gray-900">${product.price}</div>
          
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-indigo-100 pl-4">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-gray-100">
             {/* Quantity Selector */}
             <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="p-2 hover:bg-white rounded-full transition-colors"><Minus size={18}/></button>
                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2 hover:bg-white rounded-full transition-colors"><Plus size={18}/></button>
             </div>

             {/* Add to Cart Button */}
             <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-indigo-600 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95"
             >
                <ShoppingCart size={22} />
                Add to Cart
             </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-4">
             <div className="flex items-center gap-2"><Truck size={18} className="text-indigo-600" /> <span>Free Express Delivery</span></div>
             <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-indigo-600" /> <span>2 Year Official Warranty</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;