import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useGetBlogByIdQuery } from '../features/blogs/blogApi'

const BlogDetail = () => {

    const { id } = useParams();
    const location = useLocation()
    const isManageView = location.pathname.startsWith("/manage-blogs")
    const { data: blog, isLoading, isSuccess, isError, error } = useGetBlogByIdQuery(id)
    let isOwner;
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);

        if (isError) {
            throw new Error(error);
        }

        isOwner = user.id == blog.authorId

        console.log(blog);
        console.log("isOwner: ", isOwner);
        console.log("isManageView", isManageView);

    } catch (error) {
        console.log(error);
    }

    if (isLoading) {
        return <p>Loading detials...</p>
    }

    return (
        <div>

            {isSuccess &&
                blog.title
            }

            {
                (isOwner && isManageView) &&
                <p>Edit and delete options</p>
            }
        </div>
    )
}

export default BlogDetail