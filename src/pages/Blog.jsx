import React from 'react'
import { useGetAllBlogsQuery, useLazyGetAllBlogsQuery } from '../features/blogs/blogApi'

const Blog = () => {

    const { data: allBlogs, isLoading: loadingBlogs, isError: isErrorLoadingBlogs } = useGetAllBlogsQuery()

    console.log(allBlogs);

    return (
        <div>
            {
                allBlogs?.map((blog) => (
                    <div key={blog.id}>
                        <h2>{blog.title}</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default Blog