import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { authSlice } from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  initalState: "",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
