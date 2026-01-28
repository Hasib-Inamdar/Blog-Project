import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogs",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),

  tagTypes: ["blogs"],

  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/blogs?isPrivate=false",
      providesTags: ["blogs"],
    }),

    getCurrentUserBlogs: builder.query({
      query: (userId) => `/blogs?authorId=${userId}`,
      providesTags: ["blogs"],
    }),

    getBlogById: builder.query({
      query: (blogId) => `/blogs/${blogId}`,
      providesTags: (result, error, blogId) => [{ type: "blogs", id: blogId }],
      // The above tag only refetches when the specific blog is updated
    }),

    addBlog: builder.mutation({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["blogs"],
    }),

    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "blogs", id }, "blogs"],
    }),
  }),
});

export const {
  useGetBlogByIdQuery,
  useGetAllBlogsQuery,
  useLazyGetAllBlogsQuery,
  useLazyGetBlogByIdQuery,
  useGetCurrentUserBlogsQuery,
  useLazyGetCurrentUserBlogsQuery,
  useAddBlogMutation,
} = blogApi;
