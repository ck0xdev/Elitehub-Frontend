import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectSelectedProduct } from '../features/product/productSlice';
import { Star, Truck, ShieldCheck, ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-100 rounded-[2.5rem] p-10 flex items-center justify-center min-h-[500px] relative overflow-hidden group"
        >
          {/* Decorative Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 rounded-full blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
          
          <motion.img 
            key={product.avatar}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            src={`/uploads/${product.avatar}`} 
            alt={product.title}
            className="w-full max-w-md object-contain drop-shadow-2xl z-10"
          />
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
             <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
             </span>
             <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
               {product.title}
             </h1>
             
             {/* Rating */}
             <div className="flex items-center gap-2 mt-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                    ))}
                </div>
                <span className="text-gray-500 font-medium">({product.rating} Reviews)</span>
             </div>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-gray-900">
            ${product.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-indigo-100 pl-4">
            {product.description}
          </p>

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-gray-100">
             {/* Qty Counter */}
             <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="p-2 hover:bg-white rounded-full transition-colors"><Minus size={18}/></button>
                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2 hover:bg-white rounded-full transition-colors"><Plus size={18}/></button>
             </div>

             {/* Add to Cart Button */}
             <button className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-indigo-600 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95">
                <ShoppingCart size={22} />
                Add to Cart
             </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-4">
             <div className="flex items-center gap-2">
                <Truck size={18} className="text-indigo-600" />
                <span>Free Express Delivery</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span>2 Year Official Warranty</span>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;