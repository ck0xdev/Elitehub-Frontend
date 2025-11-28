import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await fetch('http://127.0.0.1:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    return await response.json();
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId) => {
    const response = await fetch(`http://127.0.0.1:8080/cart?user=${userId}`);
    return await response.json();
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await fetch(`http://127.0.0.1:8080/cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    return await response.json();
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    await fetch(`http://127.0.0.1:8080/cart/${itemId}`, { method: 'DELETE' });
    return itemId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle' },
  reducers: {
    clearCart: (state) => { state.items = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index !== -1) state.items.splice(index, 1);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export default cartSlice.reducer;