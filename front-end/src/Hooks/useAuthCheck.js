import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/user/userAuthSlice";

export default function useAuthCheck () {
    const dispatch = useDispatch()
    const [authChecked, setAuthChecked] = useState(false)
   useEffect(()=>{
    const localAuth = localStorage.getItem("accessToken");
    if(localAuth) {
        const auth = JSON.parse(localAuth);
        if(auth?.access_token && auth?.user) {
            dispatch(userLoggedIn({
                access_token : auth.access_token,
                user:auth.user
            }))
        }
    }
    setAuthChecked(true)
   },[dispatch, setAuthChecked])
   return authChecked;
}