import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { hasRole, ROLES } from "../../utils/constants/roles";
import Header from "./Header";
import UserSidebar from "./Sidebar/UserSidebar";
import AdminSidebar from "./Sidebar/AdminSidebar";
import InstructorSidebar from "./Sidebar/InstructorSidebar";
import MobileSidebar from "./Sidebar/MobileSidebar";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Set initial state based on screen size
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024); // lg breakpoint
    };

    // Set initial value
    handleResize();

    // Add listener for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSidebar = (onClose, isMobile = false) => {
    // On large screens, don't close sidebar on navigation
    const handleClose = () => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    };

    if (hasRole(user?.roles, "ROLE_ADMIN")) {
      return <AdminSidebar onClose={handleClose} isMobile={isMobile} />;
    }
    if (hasRole(user?.roles, "ROLE_INSTRUCTOR")) {
      return <InstructorSidebar onClose={handleClose} isMobile={isMobile} />;
    }
    return <UserSidebar onClose={handleClose} isMobile={isMobile} />;
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarComponent={getSidebar(() => setSidebarOpen(false), true)}
      />

      {/* Desktop Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-0 lg:translate-x-0 lg:overflow-hidden"
        }`}
      >
        {getSidebar(() => setSidebarOpen(false), false)}
      </div>

      {/* Header */}
      <div
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "left-64" : "left-0"
        }`}
      >
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:left-64" : "left-0"
        }`}
      >
        <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
          <div className="pt-16">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
