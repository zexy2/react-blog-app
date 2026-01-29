/**
 * User Slice
 * Manages current user state and authentication
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  role: null, // user, moderator, admin
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.role = action.payload?.role || null;
    },
    setSession: (state, action) => {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload?.user) {
        state.role = action.payload.user.role || null;
      }
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
      state.role = null;
    },
  },
});

export const { logout, setUser, setSession, setLoading, setError } =
  userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;
export const selectUserRole = (state) => state.user.role;
export const selectIsAdmin = (state) => state.user.role === "admin";

export default userSlice.reducer;
