import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },

    authFinished: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },

    startLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  authFinished,
  startLoading,
} = authSlice.actions;

export default authSlice.reducer;