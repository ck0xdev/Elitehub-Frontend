import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemFromCartAsync, selectItems, updateCartAsync, fetchCartByUserIdAsync } from '../features/cart/cartSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  
  const totalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  if (!items.length) return <div className="pt-32 text-center text-xl">Your cart is empty <Link to="/shop" className="text-indigo-600 underline">Go Shop</Link></div>;

  return (
    <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border">
              <img src={`/uploads/${item.product.avatar}`} className="w-24 h-24 object-contain" onError={(e) => e.target.src="https://via.placeholder.com/150"} />
              <div className="flex-1">
                <h3 className="font-bold">{item.product.title}</h3>
                <p className="text-gray-500">${item.product.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => dispatch(deleteItemFromCartAsync(item.id))} className="text-red-500"><Trash2 size={20}/></button>
                <div className="flex items-center gap-2">
                    <button onClick={() => dispatch(updateCartAsync({id: item.id, quantity: item.quantity + 1}))}><Plus size={16}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => item.quantity > 1 && dispatch(updateCartAsync({id: item.id, quantity: item.quantity - 1}))}><Minus size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between text-lg font-bold mb-4"><span>Total</span><span>${totalAmount.toFixed(2)}</span></div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Checkout</button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;