import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../Shared/Loading";

const Dashboard = () => {
  const { email, userName } = useSelector((state) => state.user);
  const [isAdmin, isLoading] = useAdmin(email);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Premium Sidebar */}
      <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {getInitials(userName)}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userName || "User"}</div>
            <div className="sidebar-user-role">{isAdmin ? "Administrator" : "Patient"}</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          
          <Link 
            to="/dashboard" 
            className={`sidebar-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </Link>

          {!isAdmin && (
            <>
              <Link 
                to="/dashboard/profile" 
                className={`sidebar-nav-link ${isActive('/dashboard/profile')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                My Profile
              </Link>
              <Link 
                to="/dashboard/myAppointments" 
                className={`sidebar-nav-link ${isActive('/dashboard/myAppointments')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                My Appointments
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <div className="sidebar-section-label" style={{ marginTop: '16px' }}>Administration</div>
              
              <Link 
                to="/dashboard/allAppointments" 
                className={`sidebar-nav-link ${isActive('/dashboard/allAppointments')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                All Appointments
              </Link>
              
              <Link 
                to="/dashboard/doctors" 
                className={`sidebar-nav-link ${isActive('/dashboard/doctors')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Manage Doctors
              </Link>
              
              <Link 
                to="/dashboard/adddoctor" 
                className={`sidebar-nav-link ${isActive('/dashboard/adddoctor')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Add Doctor
              </Link>

              <Link 
                to="/dashboard/users" 
                className={`sidebar-nav-link ${isActive('/dashboard/users')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="sidebar-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                All Users
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main fade-in">
        <Outlet />
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
    </div>
  );
};

export default Dashboard;
