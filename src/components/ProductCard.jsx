import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const ProductCard = ({ product }) => {
  return (
    <motion.div whileHover={{ y: -10 }} className="group ...">
      {/* Wrap everything inside the Main Div with Link */}
      <Link to={`/product-detail/${product.id}`} className="block h-full">
        
         {/* ... keep all existing code inside ProductCard ... */}
         {/* (Image, Badge, Title, Price, etc.) */}
         
      </Link>
    </motion.div>
  );
};

export default ProductCard;