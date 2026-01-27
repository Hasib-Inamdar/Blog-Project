import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthInit from '../features/auth/AuthInit'

const MainLayout = () => {

    return (<>
        <AuthInit></AuthInit>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    )
}

export default MainLayout