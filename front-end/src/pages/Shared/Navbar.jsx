import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import logo from "../../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOutState } from "../../features/services/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { email, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => dispatch(setUserLogOutState()))
      .catch((err) => console.log(err.message));
    navigate("/");
  };

  const menuItems = (
    <>
      <li className="hover:bg-secondary hover:rounded">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:bg-secondary hover:rounded">
        <Link to="appointment">Appointment</Link>
      </li>
      <li className="hover:bg-secondary hover:rounded">
        <Link to="review">Review</Link>
      </li>
      <li className="hover:bg-secondary hover:rounded">
        <Link to="contact">Contact</Link>
      </li>
      <li className="hover:bg-secondary hover:rounded">
        <Link to="about">About</Link>
      </li>
      {email && (
        <li className="hover:bg-secondary hover:rounded">
          <Link to="dashboard">Dashboard</Link>
        </li>
      )}
      <li
        className=" hover:bg-secondary hover:rounded tooltip tooltip-open tooltip-bottom tooltip-info"
        data-tip={userName ? `${userName} ` : "user"}
      >
        {!email ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleSignOut}>Logout</button>
        )}
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 max-w-full fixed top-0 left-0 justify-center shadow-sm z-10 ">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-compact dropdown-content   shadow bg-base-100 rounded-box w-52   lg:max-w-lg"
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className=" flex justify-center items-center font-bold normal-case text-xl  "
        >
          <span>
            <img src={logo} alt="" width={80} />
          </span>
          DoctosPortal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 " tabIndex="1">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <label
          htmlFor="my-drawer-2"
          tabIndex="1"
          className="drawer-overlay btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
