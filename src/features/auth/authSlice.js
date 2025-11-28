import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Create User (Sign Up)
export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      
      // Parse the JSON response first
      const data = await response.json();

      if (!response.ok) {
        // Return the actual error message from the backend
        // (Backend usually sends { message: "..." } or { error: "..." })
        throw new Error(data.message || data.error || 'Signup failed');
      }
      
      return data;
    } catch (error) {
      // Pass the specific error message to the UI
      return rejectWithValue(error.message);
    }
  }
);

// 2. Login User
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // CHANGED: localhost -> 127.0.0.1
      const response = await fetch('http://127.0.0.1:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;