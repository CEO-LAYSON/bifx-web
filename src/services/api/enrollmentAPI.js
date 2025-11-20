import axiosInstance from "./axiosConfig";

export const enrollmentAPI = {
  requestEnrollment: (enrollmentData) =>
    axiosInstance.post("/v1/enrollments/request", enrollmentData),

  getEnrollmentDetails: (enrollmentId) =>
    axiosInstance.get(`/v1/enrollments/${enrollmentId}`),

  getUserEnrollments: () => axiosInstance.get("/v1/enrollments/my-enrollments"),

  // Admin endpoints
  getPendingEnrollments: () =>
    axiosInstance.get("/v1/admin/enrollments/pending"),

  verifyEnrollment: (enrollmentId) =>
    axiosInstance.post(`/v1/admin/enrollments/${enrollmentId}/verify`),
};
