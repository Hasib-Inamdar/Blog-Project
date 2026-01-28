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
    if (isError) return <p>Failed to load blog</p>;


    return (
        <div>
            <div className='blog-cnt'>

                <div className="author-dtls">
                    <div className="author-img">
                        <img src={blog.aurthorProfileImage} alt="DP" />
                    </div>
                    <p className='author-name'>{blog.authorName}</p>
                    <p className='blog-date'>{blog.date}</p>
                </div>

                <div className="headings-sec">
                    <h1 className='blog-title'>{blog.title}</h1>
                    <h1 className='blog-description'>{blog.description}</h1>
                </div>

                <div className="blog-img-sec">
                    <img src={blog.image} alt="Blog Image" />
                </div>

                <div className="blog-body-sec">
                    {blog.body}
                </div>

                <div className="blog-likes-sec">
                    <p className='blog-likes'>{blog.reactions.likes}</p>
                </div>

            </div>

            {
                (isOwner && isManageView) &&
                <p>Edit and delete options</p>
            }
        </div>
    )
}

export default BlogDetail