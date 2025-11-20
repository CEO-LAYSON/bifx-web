import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { hasRole } from "../../utils/constants/roles";
import Header from "./Header";
import UserSidebar from "./Sidebar/UserSidebar";
import AdminSidebar from "./Sidebar/AdminSidebar";
import InstructorSidebar from "./Sidebar/InstructorSidebar";
import MobileSidebar from "./Sidebar/MobileSidebar";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getSidebar = () => {
    if (hasRole(user?.roles, "ROLE_ADMIN")) {
      return <AdminSidebar />;
    }
    if (hasRole(user?.roles, "ROLE_INSTRUCTOR")) {
      return <InstructorSidebar />;
    }
    return <UserSidebar />;
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarComponent={getSidebar()}
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">{getSidebar()}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
