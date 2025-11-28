import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectItems } from '../features/cart/cartSlice';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'; // Import updateUser
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { Navigate } from 'react-router-dom';
import { ArrowRight, MapPin, CreditCard, Wallet, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [saveAddress, setSaveAddress] = useState(false);
  
  const totalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const onSubmit = (data) => {
    const order = {
        items: items.map(item => ({ product: item.product.id, quantity: item.quantity, price: item.product.price, title: item.product.title })),
        totalAmount, user: user.id, shippingAddress: data, paymentMethod
    };
    
    // Save Address if checked
    if (saveAddress) {
        const newAddresses = [...(user.addresses || []), data];
        dispatch(updateUserAsync({ id: user.id, addresses: newAddresses }));
    }

    dispatch(createOrderAsync(order));
  };

  if (currentOrder) return <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />;
  if (!items.length) return <Navigate to="/shop" />;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Form */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm space-y-8">
           {/* Address Section */}
           <div>
               <div className="flex items-center gap-3 mb-6"><div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><MapPin size={24} /></div><h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2></div>
               <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   <div className="grid grid-cols-1 gap-6">
                       <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input {...register("fullName", { required: true })} className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500" /></div>
                       <div><label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label><input {...register("address", { required: true })} className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500" /></div>
                       <div className="grid grid-cols-2 gap-4">
                           <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input {...register("city", { required: true })} className="w-full px-4 py-3 rounded-xl border" /></div>
                           <div><label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label><input {...register("postalCode", { required: true })} className="w-full px-4 py-3 rounded-xl border" /></div>
                       </div>
                       <div><label className="block text-sm font-medium text-gray-700 mb-1">Country</label><input {...register("country", { required: true })} className="w-full px-4 py-3 rounded-xl border" /></div>
                   </div>
                   <div className="flex items-center gap-2">
                       <input type="checkbox" id="saveAddr" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
                       <label htmlFor="saveAddr" className="text-sm text-gray-600">Save this address for future orders</label>
                   </div>
               </form>
           </div>

           {/* Payment Section */}
           <div>
                <div className="flex items-center gap-3 mb-6"><div className="bg-green-100 p-3 rounded-full text-green-600"><CreditCard size={24} /></div><h2 className="text-2xl font-bold text-gray-900">Payment Method</h2></div>
                <div className="grid grid-cols-1 gap-4">
                    {['Cash on Delivery', 'Credit / Debit Card', 'UPI / Net Banking'].map(method => (
                        <div key={method} onClick={() => setPaymentMethod(method)} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === method ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-300'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-indigo-600' : 'border-gray-300'}`}>
                                {paymentMethod === method && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                            </div>
                            <span className="font-medium text-gray-900">{method}</span>
                            {method === 'Cash on Delivery' && <Truck className="ml-auto text-gray-400" size={20} />}
                            {method.includes('Card') && <CreditCard className="ml-auto text-gray-400" size={20} />}
                            {method.includes('UPI') && <Wallet className="ml-auto text-gray-400" size={20} />}
                        </div>
                    ))}
                </div>
           </div>
           <button type="submit" form="checkout-form" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
               Place Order <ArrowRight size={20} />
           </button>
        </div>
        
        {/* RIGHT: Order Summary (Updated Currency) */}
        <div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-4">
                            <img src={`/uploads/${item.product.avatar}`} className="w-16 h-16 object-contain bg-gray-50 rounded-lg" onError={(e) => e.target.src="https://via.placeholder.com/150"} />
                            <div className="flex-1"><h4 className="font-bold text-sm text-gray-900">{item.product.title}</h4><p className="text-xs text-gray-500">Qty: {item.quantity}</p></div>
                            <div className="font-bold text-indigo-600">₹{(item.product.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-gray-600"><span>Items ({totalItems})</span><span>₹{totalAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 font-bold">Free</span></div>
                    <div className="flex justify-between text-xl font-black text-gray-900 pt-4"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;