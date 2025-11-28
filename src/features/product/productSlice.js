import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Fetch ALL Products
export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    // CHANGED: localhost -> 127.0.0.1
    const response = await fetch('http://127.0.0.1:8080/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
  }
);

// 2. Fetch SINGLE Product by ID
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    // CHANGED: localhost -> 127.0.0.1
    const response = await fetch(`http://127.0.0.1:8080/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;