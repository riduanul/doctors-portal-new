import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../features/user/userApi";

const useToken = (user) => {
  const [token, setToken] = useState("");
  
  useEffect(
    (user) => {
      const email = user?.email;
      if (user) {
        fetch(`http://localhost:5000/api/user/${email}`)
            .then(res => res.json())
            .then(data => {
              
                setToken(data.access_token)
            })
      }
    },
    [user]
  );
  setToken(user);
  return [token];
};

export default useToken;
