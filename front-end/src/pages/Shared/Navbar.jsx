import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import logo from "../../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOutState } from "../../features/services/userSlice";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const dispatch = useDispatch();
  const { email, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  // Theme toggle state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "doctortheme"
  );

  // Apply theme to html tag
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("doctortheme");
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        dispatch(setUserLogOutState());
      })
      .catch((err) => console.log(err.message));
    navigate("/");
  };

  const menuItems = (
    <>
      <li className="hover:bg-primary/10 rounded-lg transition-colors">
        <Link to="/" className="font-medium text-sm">Home</Link>
      </li>
      <li className="hover:bg-primary/10 rounded-lg transition-colors">
        <Link to="/appointment" className="font-medium text-sm">Appointment</Link>
      </li>
      <li className="hover:bg-primary/10 rounded-lg transition-colors">
        <a href="/#reviews" className="font-medium text-sm">Review</a>
      </li>
      <li className="hover:bg-primary/10 rounded-lg transition-colors">
        <a href="/#contact" className="font-medium text-sm">Contact</a>
      </li>
      <li className="hover:bg-primary/10 rounded-lg transition-colors">
        <Link to="/about" className="font-medium text-sm">About</Link>
      </li>
      {email && (
        <li className="hover:bg-primary/10 rounded-lg transition-colors">
          <Link to="/dashboard" className="font-medium text-sm">Dashboard</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 max-w-full fixed top-0 left-0 px-4 lg:px-8 shadow-sm z-[100] border-b border-base-200 h-16">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content shadow-xl bg-base-100 rounded-2xl w-52 mt-3 p-3 gap-1 border border-base-200 z-[110]"
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className="flex items-center font-extrabold normal-case text-xl text-primary tracking-tight"
        >
          <img src={logo} alt="Doctors Portal" className="w-10 h-10 mr-2" />
          <span>DoctorsPortal</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-1" tabIndex="1">
          {menuItems}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Notification Bell */}
        {email && <NotificationBell />}

        {/* Theme Toggle Button */}
        <label className="swap swap-rotate p-2 rounded-full hover:bg-base-200 transition-colors cursor-pointer">
          <input 
            type="checkbox" 
            onChange={handleToggle}
            checked={theme === "dark"} 
          />
          {/* sun icon */}
          <svg className="swap-on fill-current w-5 h-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          {/* moon icon */}
          <svg className="swap-off fill-current w-5 h-5 text-slate-600 dark:text-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

        {/* Login / Logout Action */}
        {!email ? (
          <Link
            to="/login"
            className="btn btn-primary btn-sm px-5 rounded-xl text-white font-semibold shadow-md hover:shadow-primary/20"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs font-semibold text-base-content/70 px-2.5 py-1 bg-base-200 rounded-full border border-base-300">
              {userName || "User"}
            </span>
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error btn-sm px-4 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>
        )}

        {/* Drawer overlay for mobile dashboard */}
        <label
          htmlFor="my-drawer-2"
          tabIndex="1"
          className="btn btn-ghost btn-sm lg:hidden p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
