import axios from "axios";
import { tokenService } from "../auth/tokenService";
import { authAPI } from "./authAPI";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://bifx-backend-app-oghf.onrender.com/api"
    : "/api");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track if we're currently refreshing the token to prevent multiple refresh calls
let isRefreshing = false;
// Queue of requests that waiting for token refresh
let failedQueue = [];

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle authentication errors (401 = unauthorized, 403 = forbidden/expired token)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // If we've already tried to refresh, don't loop
      if (originalRequest._retry) {
        // Clear auth and redirect to login
        tokenService.removeToken();
        tokenService.removeRefreshToken();
        localStorage.removeItem("user");

        const isAuthPage =
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/";

        if (!isAuthPage) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // Mark this request as retried
      originalRequest._retry = true;

      // Check if we have a refresh token
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        // No refresh token, must login again
        tokenService.removeToken();
        localStorage.removeItem("user");

        const isAuthPage =
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/";

        if (!isAuthPage) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // If already refreshing, add this request to the queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Start refreshing the token
      isRefreshing = true;

      try {
        // Call the refresh token endpoint
        const response = await authAPI.refreshToken(refreshToken);
        const { token: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        // Save new tokens
        tokenService.setToken(newAccessToken);
        if (newRefreshToken) {
          tokenService.setRefreshToken(newRefreshToken);
        }

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process any queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, process queue with error
        processQueue(refreshError, null);

        // Clear tokens and redirect to login
        tokenService.removeToken();
        tokenService.removeRefreshToken();
        localStorage.removeItem("user");

        const isAuthPage =
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/";

        if (!isAuthPage) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
