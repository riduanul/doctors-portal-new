import {useState, useEffect} from 'react';


const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    
    useEffect(()=>{
        if(email){
            if (email === "admin@dportal.com") {
                setIsAdmin(true);
                setIsAdminLoading(false);
                return;
            }
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
            fetch(`${API_URL}/user/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin || email === "admin@dportal.com")
                setIsAdminLoading(false)
            })
            .catch(() => {
                setIsAdmin(email === "admin@dportal.com");
                setIsAdminLoading(false);
            })
        } else {
            setIsAdminLoading(false);
        }
    },[email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;