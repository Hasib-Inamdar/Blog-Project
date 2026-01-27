import React from 'react'
import { useGetAllBlogsQuery, useLazyGetAllBlogsQuery } from '../features/blogs/blogApi'
import BlogCard from '../components/BlogCard';

const Blog = () => {

    const { data: allBlogs, isLoading: loadingBlogs, isError: isErrorLoadingBlogs } = useGetAllBlogsQuery()

    console.log(allBlogs);

    return (
        <div className='blogs-cnt'>
            {
                allBlogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog}></BlogCard>
                ))
            }
        </div>
    )
}

export default Blog