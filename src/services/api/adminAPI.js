import axiosInstance from "./axiosConfig";

export const adminAPI = {
  // User Management
  getAllUsers: () => axiosInstance.get("/v1/admin/users"),

  promoteToAdmin: (userId) =>
    axiosInstance.post(`/v1/admin/users/make-admin/${userId}`),

  promoteToInstructor: (userId) =>
    axiosInstance.post(`/v1/admin/users/make-instructor/${userId}`),

  demoteToUser: (userId) =>
    axiosInstance.post(`/v1/admin/users/make-user/${userId}`),

  deleteUser: (userId) => axiosInstance.delete(`/v1/admin/users/${userId}`),

  // Enrollment Management
  getPendingEnrollments: () =>
    axiosInstance.get("/v1/admin/enrollments/pending"),

  verifyEnrollment: (enrollmentId, action, notes = "") =>
    axiosInstance.post(`/v1/admin/enrollments/${enrollmentId}/verify`, {
      action,
      notes,
    }),

  // Course Management
  createCourse: (courseData) =>
    axiosInstance.post("/v1/admin/courses", courseData),

  updateCourse: (id, courseData) =>
    axiosInstance.put(`/v1/admin/courses/${id}`, courseData),

  deleteCourse: (id) => axiosInstance.delete(`/v1/admin/courses/${id}`),

  hardDeleteCourse: (id) =>
    axiosInstance.delete(`/v1/admin/courses/${id}/hard`),

  getAllAdminCourses: () => axiosInstance.get("/v1/admin/courses"),

  // Review Management
  getPendingReviews: () => axiosInstance.get("/v1/admin/reviews"),

  approveReview: (reviewId) =>
    axiosInstance.post(`/v1/admin/reviews/${reviewId}/approve`),

  rejectReview: (reviewId) =>
    axiosInstance.delete(`/v1/admin/reviews/${reviewId}`),

  // Analytics
  getDashboardStats: () => axiosInstance.get("/v1/admin/analytics/stats"),

  getRecentActivities: () =>
    axiosInstance.get("/v1/admin/analytics/activities"),
};
