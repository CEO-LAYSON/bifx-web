import axiosInstance from "./axiosConfig";

// Simple in-memory cache for API requests
const cache = new Map();
const CACHE_DURATION = 30000; // 30 seconds cache duration

// Cache wrapper for API calls
const cachedRequest = async (key, fetcher) => {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: now });

  // Cleanup old cache entries
  if (cache.size > 50) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }

  return data;
};

export const enrollmentAPI = {
  requestEnrollment: (enrollmentData) =>
    axiosInstance.post("/v1/enrollments/request", enrollmentData),

  getEnrollmentDetails: (enrollmentId) =>
    axiosInstance.get(`/v1/enrollments/${enrollmentId}`),

  getUserEnrollments: () =>
    cachedRequest("user-enrollments", () =>
      axiosInstance.get("/v1/enrollments/my-enrollments"),
    ),

  // Admin endpoints
  getPendingEnrollments: () =>
    axiosInstance.get("/v1/admin/enrollments/pending"),

  verifyEnrollment: (enrollmentId) =>
    axiosInstance.post(`/v1/admin/enrollments/${enrollmentId}/verify`),
};
