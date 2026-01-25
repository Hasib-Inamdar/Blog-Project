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

const ProtectedRoute = () => {

    const routes = [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "blog", element: <Blog /> },
                { path: "contact", element: <Home /> },
                { path: "login", element: <Login /> },

                // Authetication required
                {
                    element: <RequiredAuth />,
                    children: [
                        { path: "manage-blog", element: <ManageBlogs /> },
                        { path: "profile", element: <Profile /> },
                    ],
                },
            ]
        }
    ]
    return useRoutes(routes)
}
export default ProtectedRoute