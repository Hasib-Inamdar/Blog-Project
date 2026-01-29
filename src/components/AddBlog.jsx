import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { selectUser } from '../features/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { setAddMode, setDeleteMode, setEditMode, resetMode } from "../features/blogs/blogSlice";
import { useAddBlogMutation, useEditBlogMutation } from '../features/blogs/blogApi';


const AddBlog = ({ mode = "add", blog }) => {
    const dispatch = useDispatch()

    const [addBlog,
        { isSuccess: isAddedBlogSuccess,
            isLoading: isAddingBlog,
            isError: isErrorAddingBlog,
            error: errorAddingBlog
        }] = useAddBlogMutation()

    const [editBlog, { isSuccess: isEditedBlogSuccess,
        isLoading: isEditingBlog,
        isError: isErrorEditingBlog,
        error: errorEditingBlog
    }] = useEditBlogMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: blog?.title || "",
            description: blog?.description || "",
            image: blog?.image || "",
            body: blog?.body || "",
            isPrivate: blog?.isPrivate ?? false,
        }
    });

    const onSubmit = async (data) => {

        try {
            if (mode === "add") {
                try {
                    let user = JSON.parse(localStorage.getItem("user"))
                    const date = new Date().toISOString().split("T")[0];
                    const fullBlogData = {
                        id: nanoid(8),
                        date,
                        authorId: user.id,
                        authorName: user.name,
                        aurthorProfileImage: user.profileImage,
                        reactions: {
                            "likes": 0,
                            "comments": []
                        },
                        ...data,
                    }
                    console.log(fullBlogData);
                    await addBlog(fullBlogData);
                    reset()
                    toast.success("Blog added successfully");
                    setTimeout(() => {
                        dispatch(resetMode());
                    }, 500)
                } catch (error) {
                    toast.error("Error Adding Blog")
                    console.error(error.message())
                }
            }

            if (mode === "edit") {
                try {
                    await editBlog({
                        id: blog.id,
                        data,
                    })
                    toast.success("Blog updated successfully");
                    reset();
                    dispatch(resetMode());
                } catch (error) {
                    console.log("Error while updating blog");
                    console.error(error.message)
                }
            }

        } catch (error) {
            toast.error("Something went wrong!")
            console.error(error.message())
        }

    }
    const handleCancle = () => {
        reset()
        dispatch(resetMode());
    }

    // useEffect(() => {
    //     if (isAddedBlogSuccess) {
    //         toast.success("Blog added successfully.");
    //         dispatch(resetMode());
    //     }
    //     if (isErrorAddingBlog) {
    //         toast.error(errorAddingBlog?.data?.message || "Failed to add blog");
    //     }
    // }, [isAddedBlogSuccess, isErrorAddingBlog, dispatch])

    useEffect(() => {
        if (mode === "edit" && blog) {
            reset({
                title: blog.title,
                description: blog.description,
                image: blog.image,
                body: blog.body,
                isPrivate: blog.isPrivate,
            });
        }
    }, [mode, blog, reset]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Title input field */}
                <div>
                    <input
                        className="border p-2 w-full"
                        placeholder="Title"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 5,
                                message: "Title must be at least 5 characters",
                            },
                        })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>
                {/* Description input field */}
                <div>
                    <input
                        className="border p-2 w-full"
                        placeholder="Description"
                        {...register("description", {
                            required: "description is required",
                            minLength: {
                                value: 10,
                                message: "description must be at least 10 characters",
                            },
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>
                {/* Blog Image URL */}
                <div>
                    <input
                        className="border p-2 w-full"
                        placeholder="Blog Image URL"
                        {...register("image", {
                            required: "Blog image URL is required",
                        })}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">
                            {errors.image.message}
                        </p>
                    )}
                </div>
                {/* Body */}
                <div>
                    <textarea
                        className="border p-2 w-full"
                        placeholder="Body Of Blog"
                        rows={3}
                        {...register("body", {
                            required: "Body is required",
                            maxLength: {
                                value: 10000,
                                message: "Body cannot exceed 10000 characters",
                            },
                        })}
                    />
                    {errors.body && (
                        <p className="text-red-500 text-sm">{errors.body.message}</p>
                    )}
                </div>
                {/* Private Flag */}
                <div className="flex items-center gap-3 justify-start p-2  rounded">
                    <input
                        type="checkbox"
                        id="isPrivate"
                        className="accent-blue-600 h-4 w-4"
                        {...register("isPrivate")}
                    />
                    <label htmlFor="isPrivate" className="text-sm">
                        Make this blog private
                    </label>
                </div>


                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    {mode === "add" ? "Add Blog" : "Update Blog"}
                </button>
                <button
                    type='button'
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handleCancle}
                >
                    Cancle
                </button>
            </form>
        </div>
    )
}

export default AddBlog