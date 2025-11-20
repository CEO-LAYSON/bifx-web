import axiosInstance from "./axiosConfig";

export const courseAPI = {
  // Public endpoints
  getAllCourses: () => axiosInstance.get("/v1/courses"),

  getCourseById: (id) => axiosInstance.get(`/v1/courses/${id}`),

  getCourseWithLessons: (id) =>
    axiosInstance.get(`/v1/courses/${id}/with-lessons`),

  getCourseBySlug: (slug) => axiosInstance.get(`/v1/courses/slug/${slug}`),

  getFreeCourses: () => axiosInstance.get("/v1/courses/free"),

  getLessonsByCourse: (courseId) =>
    axiosInstance.get(`/v1/lessons/course/${courseId}`),

  getLessonById: (id) => axiosInstance.get(`/v1/lessons/${id}`),

  getNextLesson: (courseId, currentOrder) =>
    axiosInstance.get(`/v1/lessons/${courseId}/next/${currentOrder}`),

  getPreviousLesson: (courseId, currentOrder) =>
    axiosInstance.get(`/v1/lessons/${courseId}/previous/${currentOrder}`),

  // Admin endpoints
  createCourse: (courseData) =>
    axiosInstance.post("/v1/admin/courses", courseData),

  updateCourse: (id, courseData) =>
    axiosInstance.put(`/v1/admin/courses/${id}`, courseData),

  deleteCourse: (id) => axiosInstance.delete(`/v1/admin/courses/${id}`),

  hardDeleteCourse: (id) =>
    axiosInstance.delete(`/v1/admin/courses/${id}/hard`),

  getAllAdminCourses: () => axiosInstance.get("/v1/admin/courses"),
};
