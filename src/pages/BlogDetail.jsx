import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useGetBlogByIdQuery, useDeleteBlogMutation, useEditBlogMutation } from '../features/blogs/blogApi'
import { setEditMode } from '../features/blogs/blogSlice'
import AddBlog from '../components/AddBlog'
import { useSelector, useDispatch } from 'react-redux'

const BlogDetail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const location = useLocation()
    const isManageView = location.pathname.startsWith("/manage-blogs")
    const { mode } = useSelector((state) => state.blogManipulation);

    let isOwner;

    const { data: blog, isLoading, isSuccess, isError, error } = useGetBlogByIdQuery(id)
    const [deleteBlog, { isSuccess: isBlogDeleted, isLoading: isDeletingBlog }] = useDeleteBlogMutation()

    const handleDelete = async () => {
        try {
            const deleteConfirm = window.confirm("Do you want to DELETE the blog?")
            if (deleteConfirm) {
                await deleteBlog(id);
                navigate("/manage-blogs")

                if (isDeletingBlog) {
                    return <p>Deleting the blog.. Please wait</p>
                }
            } else { return }
        } catch (error) {
            console.log(error);
        }
        if (isBlogDeleted) {
            console.log(" hiting the navigation ");

            return <p>Blog deleted successfully</p>
        }
    }

    const handleEdit = () => {
        dispatch(setEditMode())
    }

    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (isError) {
            throw new Error(error);
        }
        isOwner = user.id == blog.authorId

    } catch (error) {
        console.log(error);
    }
    if (isLoading) {
        return <p>Loading detials...</p>
    }
    if (isError) return <p>Failed to load blog</p>;


    return (
        <div className='blog-cnt'>

            <div className='blog-header'>

                <div className="author-dtls">
                    <div className="author-img">
                        <img src={blog.aurthorProfileImage} alt="DP" />
                    </div>
                    <p className='author-name'>{blog.authorName}</p>
                    <p className='blog-date'>{blog.date}</p>
                </div>

                {(isOwner && isManageView) &&
                    <div className='options-sec'>
                        <button className='opt-btn editBtn' onClick={handleEdit}>Edit</button>
                        <button className='opt-btn deleteBtn' onClick={handleDelete}>Delete</button>
                    </div>
                }
            </div>


            <div className="headings-sec">
                <h1 className='blog-title'>{blog.title}</h1>
                <p className='blog-description'>{blog.description}</p>
            </div>

            <div className="blog-img-sec">
                <img src={blog.image} alt="Blog Image" />
            </div>

            <div className="blog-body-sec">
                {blog.body}
            </div>

            <div className="blog-likes-sec">
                <p className='blog-likes'>❤️ {blog.reactions.likes}</p>
            </div>

            {mode === "edit" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    {/* Popup box */}
                    <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
                        <h3 className="text-lg font-semibold mb-4">Edit Blog</h3>
                        <AddBlog mode={"edit"} blog={blog}>   </AddBlog>
                    </div>
                </div>
            )}

        </div>

    )
}

export default BlogDetail