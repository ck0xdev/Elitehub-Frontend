import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearCart } from '../cart/cartSlice'; // Import action to clear cart in Redux

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderData, { dispatch }) => {
    const response = await fetch('http://127.0.0.1:8080/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    
    // If successful, clear the cart in Frontend too
    if (response.ok) {
        dispatch(clearCart());
    }
    return data;
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (userId) => {
    const response = await fetch(`http://127.0.0.1:8080/orders/user/${userId}`);
    const data = await response.json();
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], currentOrder: null, status: 'idle' },
  reducers: {
    resetOrder: (state) => { state.currentOrder = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;