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

  const getSidebar = (onClose) => {
    if (hasRole(user?.roles, "ROLE_ADMIN")) {
      return <AdminSidebar onClose={onClose} />;
    }
    if (hasRole(user?.roles, "ROLE_INSTRUCTOR")) {
      return <InstructorSidebar onClose={onClose} />;
    }
    return <UserSidebar onClose={onClose} />;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarComponent={getSidebar(() => setSidebarOpen(false))}
      />

      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-40">
        {getSidebar()}
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:left-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        <main className="min-h-screen bg-black">
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
