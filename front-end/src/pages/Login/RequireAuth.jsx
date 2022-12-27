import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

import Loading from "../shared/Loading";

const RequireAuth = ({ children }) => {
  const email = useSelector((state) => state.user.email);
  const [loading, setLoading] = useState();

  const location = useLocation();
  if (email === null) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  if (loading) {
    return <Loading />;
  }

  return children;
};

export default RequireAuth;
