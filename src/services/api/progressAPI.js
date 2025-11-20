import axiosInstance from "./axiosConfig";

export const progressAPI = {
  updateProgress: (progressData) =>
    axiosInstance.post("/v1/progress/update", progressData),

  updateProgressDirect: (progressData) =>
    axiosInstance.post("/v1/progress/update-direct", progressData),

  getLessonProgress: (lessonId) =>
    axiosInstance.get(`/v1/progress/lesson/${lessonId}`),

  getCourseProgress: (courseId) =>
    axiosInstance.get(`/v1/progress/course/${courseId}`),

  getCourseProgressSummary: (courseId) =>
    axiosInstance.get(`/v1/progress/course/${courseId}/summary`),

  getCourseProgressSummaryDirect: (courseId) =>
    axiosInstance.get(`/v1/progress/course/${courseId}/summary-direct`),

  clearProgressCache: () => axiosInstance.delete("/v1/progress/cache/clear"),
};
