import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectAllProducts, selectProductStatus } from '../features/product/productSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    // We fetch here too, just in case the user goes directly to /shop
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Shop Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-2">Explore our exclusive collection.</p>
      </div>

      {/* Full Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;