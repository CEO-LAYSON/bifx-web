import axiosInstance from "./axiosConfig";

export const reviewAPI = {
  // User endpoints
  createReview: (reviewData) => axiosInstance.post("/v1/reviews", reviewData),

  getUserReviews: () => axiosInstance.get("/v1/reviews/my-reviews"),

  getCourseReviews: (courseId) =>
    axiosInstance.get(`/v1/reviews/course/${courseId}`),

  updateReview: (reviewId, reviewData) =>
    axiosInstance.put(`/v1/reviews/${reviewId}`, reviewData),

  deleteReview: (reviewId) => axiosInstance.delete(`/v1/reviews/${reviewId}`),

  // Admin endpoints
  getPendingReviews: () => axiosInstance.get("/v1/admin/reviews"),

  approveReview: (reviewId) =>
    axiosInstance.post(`/v1/admin/reviews/${reviewId}/approve`),

  rejectReview: (reviewId) =>
    axiosInstance.delete(`/v1/admin/reviews/${reviewId}`),
};
