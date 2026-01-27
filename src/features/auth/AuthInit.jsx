import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";

const AuthInit = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            dispatch(
                loginSuccess({
                    user: JSON.parse(user),
                    token,
                    isAuthenticated: true
                })
            );
        }
    }, [dispatch]);

    return null;
};

export default AuthInit;
