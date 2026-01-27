import React, { useEffect } from 'react'
import { useLazyGetCurrentUserBlogsQuery } from '../features/blogs/blogApi'

const ManageBlogs = () => {

    const [getUserBlogs, { isLoading: isLoadingUserBlog, isError: isErrorLoadingUserBlog }] = useLazyGetCurrentUserBlogsQuery()

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        const getUserBlogASYNC = async () => {
            const userBlogs = await getUserBlogs(user.id)
            console.log(userBlogs.data);

        }
        getUserBlogASYNC()
    }, [])
    return (
        <div>ManageBlogs</div>
    )
}

export default ManageBlogs