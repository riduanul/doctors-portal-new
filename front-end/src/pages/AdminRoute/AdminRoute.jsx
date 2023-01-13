import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import useAdmin from '../../Hooks/useAdmin'
import Loading from '../shared/Loading'

const AdminRoute = ({children}) => {
  const {user} = useSelector(state => state.user)
  const location = useLocation()

  const [isAdmin, isAdminLoading] = useAdmin(user?.email)
  console.log(isAdminLoading)
  if(isAdminLoading){
    return <Loading/>
  }
  
  if(user && isAdmin){
   
    return children;
  }

  return (
  <Navigate to='/login' state={{from : location}} replace></Navigate>
  )
}

export default AdminRoute