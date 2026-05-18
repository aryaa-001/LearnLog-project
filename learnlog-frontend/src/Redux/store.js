import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

console.log(store.getState())

export default store;