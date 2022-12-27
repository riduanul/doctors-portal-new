import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../features/user/userApi";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const [updateUser, { data, isLoading }] = useUpdateUserMutation();
  useEffect(
    (user) => {
      const username = user?.displayName;
      const email = user?.email;
      const currentUser = { username, email };
      if (user) {
        updateUser({ email, currentUser });
      }
    },
    [user]
  );
  setToken(user);
  return [token];
};

export default useToken;
