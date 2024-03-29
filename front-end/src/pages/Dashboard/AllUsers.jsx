import React from 'react'
import { useState } from 'react';
import { useAllUsersQuery, useDeleteUserMutation, useMakeAdminMutation } from '../../features/user/userApi';
import Loading from '../Shared/Loading';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const AllUsers = () => { 
const [adminError, setAdminError] = useState('')
  const {email} = useSelector(state => state.user)
  const {data, isLoading, isError, error, refetch} = useAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [makeAdmin, {}] = useMakeAdminMutation()
   
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
          setAdminError(err) 
          toast.error(`${err.data.message}`, {
            position: "bottom-left",
          });
          console.log(err)
        })
        
    }

    const handleDeleteUser = (id) => {
      deleteUser(id)
      .unwrap()
      .then(data => {
        console.log(data)
        toast.success('User Successfully Delleted!', {
          position: "bottom-left",
        });
        refetch()
      })
      .catch(err => {
        console.log(data)
        toast.error(`${err.data.message}`, {
          position: "bottom-left",
        });
        
      })
    }

    let content;
    if(isLoading){
      return   content = <Loading/>
    }
    if(isError){
      return  content = <div className='text-red-500 text-center bg-red-200 p-2 mt-5'>{error.data.message}</div>
    }
    if(adminError){
      return content= <div className='text-red-500 mt-10'>{adminError.data.error}</div>
    }
    if(data && data.users.length > 0){
      return  content =   
      <div> 
        <h2 className='text-center text-2xl p-3'>All Users</h2>
        <table className="table table-zebra w-full ">
            <thead>
              <tr className='text-purple-600 '>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Admin</th>
                    <th>Delete</th>
              </tr>
            </thead>

            <tbody>
            {data.users.map((u, i) => 
                      <tr key={i}>
                            <td>{i+1} </td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{ u.role !== 'admin' && <button className='btn btn-primary btn-xs py-1 px-1 ' onClick={()=> handleMakeAdmin(u._id)}>Make Admin</button>}</td>
                            <td>{u.email !== email && <button onClick={()=>handleDeleteUser(u._id)} className="bg-red-500 btn-xs hover:bg-red-700 text-white py-1 px-1 rounded-full">Delete</button>}</td>
                      </tr>
              )}
              </tbody>
             </table>
        </div>  
    }

    return (
    <div> {content}</div>
    
  )
}

export default AllUsers