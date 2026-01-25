import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "UserAuth",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://locastorage:3001",
  }),

  tagTypes: ["user"],

  endpoints: (builder) => {
    getUser: builder.query({
      query: () => "/users",
      providesTags: ["user"],
    });
  },
});
