// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (!serializedState) return undefined;
    const parsed = JSON.parse(serializedState);
    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem("authState");
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      ...state,
      expiry: Date.now() + 3600000, // 1 hour expiry
    });
    localStorage.setItem("authState", serializedState);
  } catch {
    console.error("Error saving state");
  }
};

const initialState = loadState() || {
  loggedInUser: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, user } = action.payload;
      state.loggedInUser = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      saveState(state);
    },

    logout(state) {
      state.loggedInUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      saveState(state);
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;

// ✅ Selectors
export const selectCurrentUser = (state) => state.auth.loggedInUser;
export const selectCurrentToken = (state) => state.auth.token;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectCurrentUserRole = (state) => state.auth.loggedInUser?.role || null;
export const selectCurrentUserId = (state) => state.auth.loggedInUser?.id || null;

