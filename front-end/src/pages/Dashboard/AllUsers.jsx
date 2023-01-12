import React from 'react'
import { useAllUsersQuery, useMakeAdminMutation } from '../../features/user/userApi';
import Loading from '../Shared/Loading';


const AllUsers = () => { 


  const {data, isLoading, isError, error, refetch} = useAllUsersQuery()
  const [makeAdmin, {}] = useMakeAdminMutation()
    const handleMakeAdmin = id => {
        makeAdmin(id)
        refetch()
    }
    let content;
    if(isLoading){
      return   content = <Loading/>
    }
    if(isError){
      return  content = <div className='text-red-500 text-center'>{error.error}</div>
    }
    if(data && data.users.length > 0){
      return  content =   
      <div> 
        
        <h2 className='text-center text-2xl p-3'>All Users</h2>
        <table className="table table-zebra w-full ">

            <tr className='text-purple-600 '>
            
                    <th>Sl</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Role</th>
                    <th>Make Admin</th>
                    <th>Delete</th>

            
            </tr>
            <tbody>
            {data.users.map((u, i) => 
        <>
      
               
                    <tr key={i}>
                            <td>{i+1}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td><button className='btn btn-primary btn-xs py-1 px-1 ' onClick={()=> handleMakeAdmin(u._id)}>Make Admin</button></td>
                            <td><button className="bg-red-500 btn-xs hover:bg-red-700 text-white py-1 px-1 rounded-full">Delete</button></td>
                    </tr>
                
                
                </>
             )}</tbody></table>
        </div>  
    }

    return (
    <div> {content}</div>
    
  )
}

export default AllUsers