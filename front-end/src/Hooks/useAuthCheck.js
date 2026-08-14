import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/user/userAuthSlice";
import { setActiveUser } from "../features/services/userSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage.getItem("accessToken");

        if (localAuth) {
            try {
                const auth = JSON.parse(localAuth);
                console.log(auth)
                if (auth?.access_token && auth?.user) {
                    dispatch(userLoggedIn({
                        access_token: auth.access_token,
                        user: auth.user,
                    }));
                    dispatch(setActiveUser({
                        userName: auth.user.username || auth.user.displayName || "User",
                        email: auth.user.email
                    }));
                }
            } catch (error) {
                console.error("Failed to parse authentication data:", error);
            }
        }

        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
}
