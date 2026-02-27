import axiosInstance from "./axiosConfig";

export const authAPI = {
  login: (credentials) => axiosInstance.post("/v1/auth/login", credentials),

  register: (userData) => axiosInstance.post("/v1/auth/register", userData),

  getCurrentUser: () => axiosInstance.get("/v1/users/me"),

  refreshToken: (refreshToken) =>
    axiosInstance.post("/v1/auth/refresh", { refreshToken }),

  // Check lockout status for an email
  checkLockoutStatus: (email) =>
    axiosInstance.get("/v1/auth/lockout-status", { params: { email } }),

  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/v1/auth/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
