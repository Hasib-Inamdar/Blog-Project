import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredAuth = () => {
    const isAuth = Boolean(localStorage.getItem("token")); // or redux state

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RequiredAuth