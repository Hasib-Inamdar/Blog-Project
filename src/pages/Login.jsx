import React, { useEffect, useState } from "react";
import { useLazyGetUserByCredentialsQuery } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { v4 as uuid } from "uuid";
import { selectIsAuth, selectUser } from "../features/auth/authSelectors";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [findUser, { isLoading }] = useLazyGetUserByCredentialsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigateToRegisterPage = () => {
        navigate("/register-user")
    }



    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredentials = {
                email,
                password
            }
            const user = await findUser(userCredentials).unwrap();
            console.log(user);

            if (!user) {
                setError("Email or password invalid");
                return;
            }
            const authToken = uuid()
            dispatch(
                loginSuccess({
                    user,
                    token: authToken,
                    isAuthenticated: true
                })
            );
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", authToken)
            localStorage.setItem("isAuth", true)
            navigate("/")


        } catch (err) {
            setError("Something went wrong");
            console.log(err);
        }
    };

    // useEffect(() => {
    //     const user = localStorage.getItem("user")
    //     const token = localStorage.getItem("token")
    //     const isAuth = localStorage.getItem("isAuth")
    //     console.log(`user: ${!!user}, token: ${!!token}, isAuth:${!!isAuth}`);
    //     if (!!user && !!token && !!isAuth) {
    //         console.log("data from the local storage can be used");
    //         dispatch(
    //             loginSuccess({
    //                 user: JSON.parse(user),
    //                 token,
    //                 isAuthenticated: true
    //             })
    //         );
    //         return
    //     }
    //     console.log("Need to authenticate");
    // }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 p-8">

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4 items-center"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Login
                    </h2>

                    <input
                        className="loginInputFields w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="loginInputFields w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-7 py-2 bg-blue-500 hover:bg-blue-400 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-sm mt-3 text-center">
                        {error}
                    </p>
                )}

                <div className="mt-6 text-center border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                        New User?
                    </p>

                    <button
                        className="bg-green-400 hover:bg-green-300 px-7 py-2 text-sm"
                        onClick={handleNavigateToRegisterPage}
                    >
                        Create new account
                    </button>
                </div>

            </div>
        </div>

    );
};

export default Login;
