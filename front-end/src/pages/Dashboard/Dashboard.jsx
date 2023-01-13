import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const {email} = useSelector(state => state.user)
  
  const [isAdmin] = useAdmin(email)
  return (
    <div className="mt-20">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex font-bold flex-col items-center justify-start">
          <h2 className="text-5xl text-purple-400">
            Welcome To Your Dashboard
          </h2>
          <Outlet> </Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
           
           {
            isAdmin &&
             <>
              <li>
                <Link to="/dashboard/adddoctor">Add Doctor</Link>
              </li>            
              <li>
                <Link to="/dashboard/users">All Users</Link>
              </li>            
            </>
           }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
