import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { ROUTES } from "../../utils/constants/routes";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-purple">404</h1>
          <h2 className="text-3xl font-bold text-white mt-4">Page Not Found</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center px-6 py-3 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
