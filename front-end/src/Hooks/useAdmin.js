import {useState, useEffect} from 'react';


const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    
    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/api/user/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.isAdmin)
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
                console.log(isAdmin)
                console.log(isAdminLoading)

            })
            
        }

    },[email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;