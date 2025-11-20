import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../utils/constants/routes'

// Placeholder components - replace with actual components later
const Home = () => <div>Home Page</div>
const Login = () => <div>Login Page</div>
const Register = () => <div>Register Page</div>
const Courses = () => <div>Courses Page</div>
const Dashboard = () => <div>Dashboard Page</div>
const Profile = () => <div>Profile Page</div>
const AdminDashboard = () => <div>Admin Dashboard</div>
const AdminUsers = () => <div>Admin Users</div>
const AdminCourses = () => <div>Admin Courses</div>
const AdminEnrollments = () => <div>Admin Enrollments</div>
const InstructorDashboard = () => <div>Instructor Dashboard</div>
const InstructorCourses = () => <div>Instructor Courses</div>
const InstructorStudents = () => <div>Instructor Students</div>

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.COURSES} element={<Courses />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
      <Route path={ROUTES.ADMIN.USERS} element={<AdminUsers />} />
      <Route path={ROUTES.ADMIN.COURSES} element={<AdminCourses />} />
      <Route path={ROUTES.ADMIN.ENROLLMENTS} element={<AdminEnrollments />} />
      <Route path={ROUTES.INSTRUCTOR.DASHBOARD} element={<InstructorDashboard />} />
      <Route path={ROUTES.INSTRUCTOR.COURSES} element={<InstructorCourses />} />
      <Route path={ROUTES.INSTRUCTOR.STUDENTS} element={<InstructorStudents />} />
    </Routes>
  )
}

export default AppRoutes