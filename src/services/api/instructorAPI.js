import axiosInstance from "./axiosConfig";

export const instructorAPI = {
  // Course Management
  createCourse: (courseData) =>
    axiosInstance.post("/v1/instructor/courses", courseData),

  updateCourse: (id, courseData) =>
    axiosInstance.put(`/v1/instructor/courses/${id}`, courseData),

  deleteCourse: (id) => axiosInstance.delete(`/v1/instructor/courses/${id}`),

  getMyCourses: () => axiosInstance.get("/v1/instructor/courses"),

  getCourseDetails: (id) => axiosInstance.get(`/v1/instructor/courses/${id}`),

  // Lesson Management
  createLesson: (courseId, lessonData) =>
    axiosInstance.post(
      `/v1/instructor/courses/${courseId}/lessons`,
      lessonData
    ),

  updateLesson: (lessonId, lessonData) =>
    axiosInstance.put(`/v1/instructor/lessons/${lessonId}`, lessonData),

  deleteLesson: (lessonId) =>
    axiosInstance.delete(`/v1/instructor/lessons/${lessonId}`),

  getCourseLessons: (courseId) =>
    axiosInstance.get(`/v1/instructor/courses/${courseId}/lessons`),

  // Student Management
  getCourseStudents: (courseId) =>
    axiosInstance.get(`/v1/instructor/courses/${courseId}/students`),

  getStudentProgress: (courseId, studentId) =>
    axiosInstance.get(
      `/v1/instructor/courses/${courseId}/students/${studentId}/progress`
    ),

  // Analytics
  getInstructorStats: () => axiosInstance.get("/v1/instructor/analytics/stats"),

  getCoursePerformance: (courseId) =>
    axiosInstance.get(`/v1/instructor/courses/${courseId}/performance`),
};
