import React, { useState } from "react";
import { useLazyGetUserByEmailQuery } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { v4 as uuid } from "uuid";
import { selectIsAuth, selectUser } from "../features/auth/authSelectors";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const [findUser, { isLoading }] = useLazyGetUserByEmailQuery();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredentials = {
                email,
                password
            }
            const users = await findUser(userCredentials).unwrap();
            console.log(users);

            if (!users) {
                setError("User not found");
                return;
            }

            dispatch(
                loginSuccess({
                    users,
                    token: uuid(),
                })
            );

            const isAuth = selectIsAuth()
            console.log(isAuth);

        } catch (err) {
            setError("Something went wrong");
        }
    };

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
