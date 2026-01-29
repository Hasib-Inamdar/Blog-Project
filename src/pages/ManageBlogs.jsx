import React, { useEffect, useState } from "react";
import { useLazyGetCurrentUserBlogsQuery, useGetCurrentUserBlogsQuery } from "../features/blogs/blogApi";
import BlogCard from "../components/BlogCard";
import AddBlog from "../components/AddBlog";
import { setAddMode, setDeleteMode, setEditMode, resetMode } from "../features/blogs/blogSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const ManageBlogs = () => {
    // const [userBlogs, setUserBlogs] = useState([]);
    // const [isAddingBlog, setIsAddingBlog] = useState(false);
    const { mode } = useSelector((state) => state.blogManipulation);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));

    const {
        data: userBlogs = [],
        isLoading: isLoadingUserBlog,
        isError: isErrorLoadingUserBlog,
    } = useGetCurrentUserBlogsQuery(user?.id, {
        skip: !user?.id,
    });


    if (isLoadingUserBlog) {
        return <p>Loading your blogs...</p>;
    }

    if (isErrorLoadingUserBlog) {
        return <p className="text-red-500">Failed to load blogs</p>;
    }

    return (
        <div className="manage-blog-cnt">
            <div className="manage-blog-header">
                <h2 className="page-heading">My Blogs</h2>
                <button
                    className=" opt-btn add-blog-btn"
                    onClick={() => dispatch(setAddMode())}
                >
                    Add Blog
                </button>
            </div>

            {userBlogs.length === 0 ? (
                <p>No blogs found</p>
            ) : (
                <div className="blogs-cnt">
                    {userBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} isManageView={true} />
                    ))}
                </div>
            )}

            {mode === "add" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    {/* Popup box */}
                    <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
                        <h3 className="text-lg font-semibold mb-4">Add New Blog</h3>
                        <AddBlog>   </AddBlog>


                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
