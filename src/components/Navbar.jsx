import React from 'react'
import { NavLink } from 'react-router-dom'



const Navbar = () => {

    const isAuth = Boolean(localStorage.getItem("token"));

    const linkClass = ({ isActive }) =>
        isActive
            ? "text-amber-800 font-semibold"
            : "text-gray-700 hover:text-amber-700"

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
                {isAuth && <div> <button className='bg-red-500 rounded-sm px-2 py-1 text-white'>Logout</button></div>}
            </div>
        </div>
    )
}

export default Navbar