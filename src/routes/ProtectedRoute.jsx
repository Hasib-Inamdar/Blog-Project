import React from 'react'
import { BrowserRouter, useRoutes, } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Blog from '../pages/Blog'
import Profile from '../pages/Profile'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login'
import ManageBlogs from '../pages/ManageBlogs'
import RequiredAuth from './RequiredAuth'
import Register from '../pages/Register'
import BlogDetail from '../pages/BlogDetail'

const ProtectedRoute = () => {

    const routes = [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "blogs", element: <Blog /> },
                { path: "blogs/:id", element: <BlogDetail /> },
                { path: "contact", element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "register-user", element: <Register /> },

                // Authetication required
                {
                    element: <RequiredAuth />,
                    children: [
                        { path: "manage-blogs", element: <ManageBlogs /> },
                        { path: "manage-blogs/:id", element: <BlogDetail /> },
                        { path: "profile", element: <Profile /> },
                    ],
                },
            ]
        }
    ]
    return useRoutes(routes)
}
export default ProtectedRoute