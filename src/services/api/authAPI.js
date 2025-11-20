import axiosInstance from "./axiosConfig";

export const authAPI = {
  login: (credentials) => axiosInstance.post("/v1/auth/login", credentials),

  register: (userData) => axiosInstance.post("/v1/auth/register", userData),

  getCurrentUser: () => axiosInstance.get("/v1/users/me"),

  refreshToken: (refreshToken) =>
    axiosInstance.post("/v1/auth/refresh", { refreshToken }),
};
