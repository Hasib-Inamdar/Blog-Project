import React, { useEffect, useState } from "react";
import { useLazyGetUserByCredentialsQuery } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { v4 as uuid } from "uuid";
import { selectIsAuth, selectUser } from "../features/auth/authSelectors";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const [findUser, { isLoading }] = useLazyGetUserByCredentialsQuery();

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

        } catch (err) {
            setError("Something went wrong");
            console.log(err);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        const isAuth = localStorage.getItem("isAuth")
        console.log(`user: ${!!user}, token: ${!!token}, isAuth:${!!isAuth}`);
        if (!!user && !!token && !!isAuth) {
            console.log("data from the local storage can be used");
            dispatch(
                loginSuccess({
                    user: JSON.parse(user),
                    token,
                    isAuthenticated: true
                })
            );
            return
        }
        console.log("Need to authenticate");
    }, [])

    return (
        <div>
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-3 min-w-60 w-[70%] md:w-[50%] items-center"
            >
                <input
                    className="loginInputFields"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="loginInputFields"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-7 py-2 bg-blue-400 hover:bg-blue-300 rounded-md text-white"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default Login;
