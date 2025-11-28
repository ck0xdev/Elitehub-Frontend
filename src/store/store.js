import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice'; // Import this

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer, // Add this
  },
});