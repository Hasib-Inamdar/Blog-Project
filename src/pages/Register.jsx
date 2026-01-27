import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { v4 as uuid } from "uuid"
import toast from "react-hot-toast";
import { useAddUserMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";


const Register = () => {
    const [addUser, { isLoading: isAddingUser, isSuccess: isAddedUser, error: errorAddingUser }] = useAddUserMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        try {
            const userData = {
                id: nanoid(8), // Generates unique user id 
                ...data,
            };
            await addUser(userData)
            isAddingUser && toast.loading("Registering user...")
            if (isAddedUser) {
                toast.success("Account created successfully 🎉");

                // This code add the user info to the localstorage after successfull account creating
                {
                    const authToken = uuid()
                    dispatch(
                        loginSuccess({
                            user: userData,
                            token: authToken,
                            isAuthenticated: true
                        })
                    );
                    localStorage.setItem("user", JSON.stringify(userData))
                    localStorage.setItem("token", authToken)
                    localStorage.setItem("isAuth", true)
                }
                reset()
                navigate("/")
            }
        } catch (error) {
            toast.error(error.messag)
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-md mx-auto"
        >
            {/* Name */}
            <div>
                <input
                    className="border p-2 w-full"
                    placeholder="Full Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <input
                    className="border p-2 w-full"
                    type="email"
                    placeholder="Email Address"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>

            {/* Profile Image URL */}
            <div>
                <input
                    className="border p-2 w-full"
                    placeholder="Profile Image URL"
                    {...register("profileImage", {
                        required: "Profile image URL is required",
                    })}
                />
                {errors.profileImage && (
                    <p className="text-red-500 text-sm">
                        {errors.profileImage.message}
                    </p>
                )}
            </div>

            {/* Bio */}
            <div>
                <textarea
                    className="border p-2 w-full"
                    placeholder="Short Bio"
                    rows={3}
                    {...register("bio", {
                        required: "Bio is required",
                        maxLength: {
                            value: 200,
                            message: "Bio cannot exceed 200 characters",
                        },
                    })}
                />
                {errors.bio && (
                    <p className="text-red-500 text-sm">{errors.bio.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Register
            </button>
        </form>
    );
};

export default Register;
