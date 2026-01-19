export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  COURSES: "/courses",
  DASHBOARD: "dashboard",
  PROFILE: "profile",
  ADMIN: {
    DASHBOARD: "admin",
    USERS: "admin/users",
    COURSES: "admin/courses",
    CREATE_COURSE: "admin/courses/create",
    ENROLLMENTS: "admin/enrollments",
  },
  INSTRUCTOR: {
    DASHBOARD: "instructor",
    COURSES: "instructor/courses",
    CREATE_COURSE: "instructor/courses/create",
    STUDENTS: "instructor/students",
  },
};
