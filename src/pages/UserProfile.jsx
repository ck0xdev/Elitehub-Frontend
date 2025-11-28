import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, fetchUserProfileAsync, logout } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfileAsync(user.id));
    }
  }, [dispatch, user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Left Sidebar */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="font-bold text-lg mb-4">Account Details</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <button onClick={() => dispatch(logout())} className="mt-4 text-red-600 font-semibold hover:underline">Log Out</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="font-bold text-lg mb-4">Saved Addresses</h2>
                {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border">
                            <p className="font-bold">{addr.fullName}</p>
                            <p>{addr.address}, {addr.city}</p>
                            <p>{addr.postalCode}</p>
                        </div>
                    ))
                ) : <p className="text-sm text-gray-500">No addresses saved.</p>}
            </div>
         </div>

         {/* Main Content: Wishlist */}
         <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">My Wishlist ({user.wishlist?.length || 0})</h2>
            {user.wishlist && user.wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {user.wishlist.map(product => (
                        product && product.title ? <ProductCard key={product.id} product={product} /> : null
                    ))}
                </div>
            ) : <p className="text-gray-500">Your wishlist is empty.</p>}
         </div>
      </div>
    </div>
  );
};

export default UserProfile;