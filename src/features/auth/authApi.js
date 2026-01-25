import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),

  tagTypes: ["users"],

  endpoints: (builder) => ({
    // Get All users
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    //Get specific user
    getUser: builder.query({
      query: (userID) => `/users/${userID}`,
      providesTags: ["users"],
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useAddUserMutation,
} = authApi;
