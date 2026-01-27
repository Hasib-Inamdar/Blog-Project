import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["blogs"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useLazyGetAllBlogsQuery } = blogApi;
