import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAsync, selectOrders } from '../features/order/orderSlice';
import { selectLoggedInUser, fetchUserProfileAsync, logout } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersAsync(user.id));
      dispatch(fetchUserProfileAsync(user.id)); // Fetch latest data including Wishlist
    }
  }, [dispatch, user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
      <p className="text-gray-500 mb-8">Welcome back, {user.email}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Left Sidebar */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="font-bold text-lg mb-4">Account Details</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Role: {user.role}</p>
                <button onClick={() => dispatch(logout())} className="mt-4 text-red-600 font-semibold hover:underline">Log Out</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="font-bold text-lg mb-4">Saved Addresses</h2>
                {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                            <p className="font-bold">{addr.fullName}</p>
                            <p>{addr.address}, {addr.city}</p>
                            <p>{addr.postalCode}, {addr.country}</p>
                        </div>
                    ))
                ) : <p className="text-sm text-gray-500">No addresses saved.</p>}
            </div>
         </div>

         {/* Main Content */}
         <div className="lg:col-span-2 space-y-10">
             {/* Wishlist */}
             <div>
                <h2 className="text-2xl font-bold mb-6">My Wishlist ({user.wishlist?.length || 0})</h2>
                {user.wishlist && user.wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {user.wishlist.map(product => (
                            // Handle both populated object and ID only cases
                            product.title ? <ProductCard key={product.id} product={product} /> : null
                        ))}
                    </div>
                ) : <p className="text-gray-500">Your wishlist is empty.</p>}
             </div>

             {/* Orders */}
             <div>
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-gray-900">Order #{order.id.slice(-6)}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p className="text-sm text-indigo-600 font-semibold">{order.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">₹{order.totalAmount}</p>
                                    <p className="text-sm text-gray-500">{order.items.length} Items</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-500">No orders yet.</p>}
             </div>
         </div>
      </div>
    </div>
  );
};
export default UserProfile;