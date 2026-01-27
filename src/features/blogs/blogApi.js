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

    getCurrentUserBlogs: builder.query({
      query: (userId) => `/blogs?authorId=${userId}`,
      providesTags: ["blogs"],
    }),

    addBlog: builder.mutation({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery, useLazyGetAllBlogsQuery } = blogApi;
