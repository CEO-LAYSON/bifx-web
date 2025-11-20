import axiosInstance from "./axiosConfig";

export const lessonAPI = {
  getLessonById: (id) => axiosInstance.get(`/v1/lessons/${id}`),

  getLessonsByCourse: (courseId) =>
    axiosInstance.get(`/v1/lessons/course/${courseId}`),

  getNextLesson: (courseId, currentOrder) =>
    axiosInstance.get(`/v1/lessons/${courseId}/next/${currentOrder}`),

  getPreviousLesson: (courseId, currentOrder) =>
    axiosInstance.get(`/v1/lessons/${courseId}/previous/${currentOrder}`),

  // Streaming
  getStreamingUrl: (lessonId) =>
    axiosInstance.get(`/v1/stream/lesson/${lessonId}`),
};
