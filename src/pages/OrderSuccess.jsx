import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOrder } from '../features/order/orderSlice';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the current order state so we can make a new one later
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-lg text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order ID is <span className="font-mono font-bold text-gray-800">#{id}</span></p>
        
        <div className="space-y-3">
            <Link to="/shop" className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Continue Shopping
            </Link>
            <Link to="/" className="block w-full py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Go Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;