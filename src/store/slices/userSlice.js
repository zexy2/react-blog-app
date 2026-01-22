/**
 * User Slice
 * Manages current user state and authentication
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { logout, setUser, setSession, setLoading, setError } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
