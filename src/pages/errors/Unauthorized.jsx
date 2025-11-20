import React from "react";
import { Link } from "react-router-dom";
import { Shield, Home } from "lucide-react";
import { ROUTES } from "../../utils/constants/routes";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Shield className="h-24 w-24 text-primary-gold mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mt-4">Access Denied</h1>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
        </div>

        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center px-6 py-3 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Home size={20} className="mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
