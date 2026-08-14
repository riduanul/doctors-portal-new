import React from 'react'
import { useState } from 'react';
import { useAllUsersQuery, useDeleteUserMutation, useMakeAdminMutation } from '../../features/user/userApi';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const AllUsers = () => { 
  const {email} = useSelector(state => state.user)
  const {data, isLoading, isError, error, refetch} = useAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [makeAdmin] = useMakeAdminMutation()
   
  const handleMakeAdmin = id => {
        makeAdmin(id)
        .unwrap()
        .then(()=>{
          refetch()
          toast.success(`Successfully added as an admin`, {
            position: "bottom-left",
          });
        })
        .catch((err)=> {
          toast.error(`${err.data?.message || err.message}`, {
            position: "bottom-left",
          });
        })
    }

    const handleDeleteUser = (id) => {
      deleteUser(id)
      .unwrap()
      .then(() => {
        toast.success('User Successfully Deleted!', {
          position: "bottom-left",
        });
        refetch()
      })
      .catch(err => {
        toast.error(`${err.data?.message || err.message}`, {
          position: "bottom-left",
        });
      })
    }

    const getInitials = (name) => {
      if (!name) return "U";
      return name.charAt(0).toUpperCase();
    };

    if(isLoading){
      return (
        <div className="premium-loading">
          <div className="spinner-ring"></div>
          <div className="premium-loading-text">Loading users...</div>
        </div>
      );
    }

    if(isError){
      return (
        <div className="error-banner">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error.data?.message || "Failed to load users"}
        </div>
      );
    }

    return (
      <div className="slide-up">
        <div className="page-header">
          <div>
            <h2 className="page-title">User Management</h2>
            <p className="page-subtitle">Manage system users, administrators, and permissions</p>
          </div>
          <div className="count-badge">{data?.users?.length || 0} Total</div>
        </div>

        <div className="content-card">
          <div className="overflow-x-auto">
            <table className="premium-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((u, i) => (
                    <tr key={u._id}>
                      <td>
                        <div className="user-cell">
                          <div className={`user-avatar-sm avatar-gradient-${(i % 4) + 1}`}>
                            {getInitials(u.username)}
                          </div>
                          <div>
                            <div className="user-cell-name">{u.username || "Unknown"}</div>
                            <div className="user-cell-email">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge role-${u.role}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {u.role !== 'admin' && (
                            <button 
                              className="btn-action btn-action-admin" 
                              onClick={() => handleMakeAdmin(u._id)}
                            >
                              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                              Make Admin
                            </button>
                          )}
                          {u.email !== email && (
                            <button 
                              className="btn-action btn-action-danger" 
                              onClick={() => handleDeleteUser(u._id)}
                            >
                              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
            {data?.users?.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div className="empty-state-title">No users found</div>
                <div className="empty-state-desc">There are no users registered in the system yet.</div>
              </div>
            )}
          </div>
        </div>  
      </div>
    )
}

export default AllUsers