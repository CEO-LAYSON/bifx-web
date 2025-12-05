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

  const getSidebar = (onClose) => {
    // On large screens, don't close sidebar on navigation
    const handleClose = () => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    };

    if (hasRole(user?.roles, "ROLE_ADMIN")) {
      return <AdminSidebar onClose={handleClose} />;
    }
    if (hasRole(user?.roles, "ROLE_INSTRUCTOR")) {
      return <InstructorSidebar onClose={handleClose} />;
    }
    return <UserSidebar onClose={handleClose} />;
  };

  return (
    <div className="h-screen overflow-hidden bg-black">
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarComponent={getSidebar(() => setSidebarOpen(false))}
      />
      <div
        className={`fixed left-0 top-0 h-full z-40 overflow-y-auto ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        {getSidebar(() => setSidebarOpen(false))}
      </div>
      <div
        className={
          sidebarOpen
            ? "fixed top-0 left-64 right-0 z-30"
            : "fixed top-0 left-0 right-0 z-30"
        }
      >
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div
        className={`absolute top-16 bottom-0 right-0 overflow-y-auto ${
          sidebarOpen ? "lg:left-64" : "left-0"
        }`}
      >
        <main className="bg-black">
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
