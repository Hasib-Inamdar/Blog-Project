import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/authSlice';
import { selectIsAuth } from '../features/auth/authSelectors';


const Navbar = () => {

    // const isAuth = localStorage.getItem("isAuth");
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch()

    const linkClass = ({ isActive }) =>
        isActive
            ? "text-amber-800 font-semibold"
            : "text-gray-700 hover:text-amber-700"

    const handleLogout = () => {
        const cofirmLogout = window.confirm("Do you want to logout?")
        if (!cofirmLogout) {
            return
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuth");
        dispatch(logout())
    }


    return (
        <div className='navbar-sec'>
            <div className="logo-sec">
                <div>
                    <p className='logo-heading'>Inner Piece</p>
                    <p className='logo-tagline'>Thoughts on Lifestyle & Mental Health</p>
                </div>
            </div>
            <div className="menu-sec">
                <div>
                    <NavLink to={"/"} className={linkClass} end>
                        <p>Home</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={"/blog"} className={linkClass} end>
                        <p>Blog</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={"/contact"} className={linkClass} end>
                        <p>Contact</p>
                    </NavLink>
                </div>

                {!isAuth &&
                    <div>
                        <NavLink to={"/login"} className={linkClass} end>
                            <p>Login</p>
                        </NavLink>
                    </div>
                }

                {isAuth && <div> <NavLink to="/manage-blog" className={linkClass}><p>Manage Blog</p></NavLink></div>}
                {isAuth && <div> <NavLink to="/profile" className={linkClass}><p>Profile</p></NavLink></div>}
                {isAuth && <div> <button onClick={handleLogout} className='bg-red-500 rounded-sm px-2 py-1 text-white'>Logout</button></div>}
            </div>
        </div>
    )
}

export default Navbar