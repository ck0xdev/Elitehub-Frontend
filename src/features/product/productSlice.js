import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Fetch ALL Products
export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    return data;
  }
);

// 2. Fetch SINGLE Product by ID (NEW!)
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  products: [],
  selectedProduct: null, // Stores the single product we are looking at
  status: 'idle',
  error: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Fetch ALL
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      
      // Handle Fetch SINGLE (NEW!)
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;