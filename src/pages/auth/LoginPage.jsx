import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user) {
    console.log("Login redirect check - user roles:", user.roles);
    if (user.roles?.includes("ROLE_ADMIN")) {
      console.log("Redirecting to admin dashboard");
      return <Navigate to="/admin" replace />;
    } else if (user.roles?.includes("ROLE_INSTRUCTOR")) {
      console.log("Redirecting to instructor dashboard");
      return <Navigate to="/instructor" replace />;
    } else {
      console.log("Redirecting to user dashboard");
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
