import jwtDecode from "jwt-decode";

export const tokenService = {
  // Access token methods
  getToken: () => localStorage.getItem("token"),
  setToken: (token) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),

  // Refresh token methods
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),

  isTokenValid: (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Check if access token is expired or about to expire (within 5 minutes)
  isTokenExpiringSoon: (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000;
      const now = Date.now();
      // Consider expiring if less than 5 minutes remaining
      return expiryTime - now < 5 * 60 * 1000;
    } catch {
      return true;
    }
  },

  getTokenData: (token) => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  },
};
