import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createUserAsync = createAsyncThunk('auth/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/auth/signup', {
      method: 'POST', body: JSON.stringify(userData), headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    return data;
  } catch (error) { return rejectWithValue(error.message); }
});

export const loginUserAsync = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/auth/login', {
      method: 'POST', body: JSON.stringify(userData), headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  } catch (error) { return rejectWithValue(error.message); }
});

// NEW: Fetch User Profile (Address, Wishlist)
export const fetchUserProfileAsync = createAsyncThunk('user/fetchProfile', async (userId) => {
    const response = await fetch(`http://127.0.0.1:8080/users/${userId}`);
    return await response.json();
});

// NEW: Update User (Save Address, Add to Wishlist)
export const updateUserAsync = createAsyncThunk('user/updateUser', async (update) => {
    const response = await fetch(`http://127.0.0.1:8080/users/${update.id}`, {
        method: 'PATCH', body: JSON.stringify(update), headers: { 'content-type': 'application/json' }
    });
    return await response.json();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { loggedInUser: null, status: 'idle', error: null },
  reducers: { logout: (state) => { state.loggedInUser = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => { state.loggedInUser = action.payload; state.status = 'idle'; })
      .addCase(loginUserAsync.rejected, (state, action) => { state.error = action.payload; state.status = 'failed'; })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => { state.loggedInUser = { ...state.loggedInUser, ...action.payload }; })
      .addCase(updateUserAsync.fulfilled, (state, action) => { state.loggedInUser = { ...state.loggedInUser, ...action.payload }; });
  },
});

export const { logout } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;