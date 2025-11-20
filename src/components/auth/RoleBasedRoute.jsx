import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasRole } from "../../utils/constants/roles";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !hasRole(user.roles, requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
