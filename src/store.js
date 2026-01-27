import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { authSlice } from "./features/auth/authSlice";
import { blogApi } from "./features/blogs/blogApi";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware),
});
