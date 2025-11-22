import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants/routes";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleBasedRoute from "../components/auth/RoleBasedRoute";
import { ROLES } from "../utils/constants/roles";

// Layouts
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";

// Public Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomePage from "../pages/public/Home/HomePage";
import CourseListPage from "../pages/public/Courses/CourseListPage";
import CourseDetailPage from "../pages/public/Courses/CourseDetailPage";
import UpgradePage from "../pages/public/Upgrade/UpgradePage";

// User Pages
import UserDashboard from "../pages/user/Dashboard/UserDashboard";
import MyCoursesPage from "../pages/user/MyCourses/MyCoursesPage";
import LiveSessionsPage from "../pages/user/LiveSessions/LiveSessionsPage";
import ProfilePage from "../pages/user/Profile/ProfilePage";
import LessonPage from "../pages/user/Learning/LessonPage";
import ProgressPage from "../pages/user/Progress/ProgressPage";
import MyProgressPage from "../pages/user/Progress/MyProgressPage";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/Dashboard/InstructorDashboard";

// Error Pages
import NotFound from "../pages/errors/NotFound";
import Unauthorized from "../pages/errors/Unauthorized";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.COURSES} element={<CourseListPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/upgrade" element={<UpgradePage />} />
      </Route>

      {/* Protected Routes with Dashboard Layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* User Routes */}
        <Route path={ROUTES.DASHBOARD} element={<UserDashboard />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="live-sessions" element={<LiveSessionsPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path="progress/:courseId" element={<ProgressPage />} />
        <Route path="my-progress" element={<MyProgressPage />} />
        {/* Admin Routes */}
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={
            <RoleBasedRoute requiredRole={ROLES.ADMIN}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Instructor Routes */}
        <Route
          path={ROUTES.INSTRUCTOR.DASHBOARD}
          element={
            <RoleBasedRoute requiredRole={ROLES.INSTRUCTOR}>
              <InstructorDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Learning Routes */}
        <Route
          path="learn/:courseId/lesson/:lessonId"
          element={<LessonPage />}
        />
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
