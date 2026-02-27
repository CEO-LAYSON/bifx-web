import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api/authAPI";
import { tokenService } from "../../services/auth/tokenService";

// Helper to safely check if token is valid
const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = localStorage.getItem("user");

  // Validate token exists and is not expired
  const isValid = token && tokenService.isTokenValid(token);

  return {
    token: isValid ? token : null,
    refreshToken: isValid ? refreshToken : null,
    user: isValid && user ? JSON.parse(user) : null,
    isAuthenticated: isValid,
  };
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({ email, password });
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        // Extract lockout details from new JSON response format
        const errorData = error.response?.data?.data;
        const errorMessage =
          errorData?.message ||
          error.response?.data?.message ||
          "Too many login attempts. Please try again.";

        // Parse new format with remainingSeconds and nextAllowedTimestamp
        const remainingSeconds =
          errorData?.remainingSeconds ||
          errorData?.nextAllowedTimestamp - Math.floor(Date.now() / 1000) ||
          0;
        const nextAllowedTimestamp = errorData?.nextAllowedTimestamp || 0;
        const failedAttempts = errorData?.failedAttempts || 5;

        // Calculate lockout end time from timestamp
        const lockoutEndTime =
          nextAllowedTimestamp > 0
            ? new Date(nextAllowedTimestamp * 1000)
            : new Date(Date.now() + remainingSeconds * 1000);

        return rejectWithValue({
          message: errorMessage,
          lockoutDuration: remainingSeconds,
          remainingSeconds: remainingSeconds,
          nextAllowedTimestamp: nextAllowedTimestamp,
          failedAttempts: failedAttempts,
          isLocked: true,
          lockoutEndTime: lockoutEndTime,
        });
      }

      // Handle attempt count information (401 Unauthorized)
      const attemptMatch =
        error.response?.data?.data?.match?.(/(\d+) attempts remaining\./) ||
        String(error.response?.data?.data)?.match(
          /(\d+) attempts remaining\./,
        ) ||
        error.response?.data?.message?.match(/(\d+) attempts remaining\./);

      if (attemptMatch) {
        return rejectWithValue({
          message: String(
            error.response?.data?.data || error.response?.data?.message,
          ),
          remainingAttempts: parseInt(attemptMatch[1]),
          isLocked: false,
        });
      }

      return rejectWithValue(
        String(
          error.response?.data?.data ||
            error.response?.data?.message ||
            "Login failed",
        ),
      );
    }
  },
);

export const checkLockoutStatus = createAsyncThunk(
  "auth/checkLockoutStatus",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.checkLockoutStatus(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check lockout status",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        return rejectWithValue(
          "Too many registration attempts. Please try again in 30 minutes.",
        );
      }
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const response = await authAPI.uploadAvatar(file);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload avatar",
      );
    }
  },
);

// Get initial auth state from localStorage with validation
const storedAuth = getStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedAuth.user,
    token: storedAuth.token,
    isAuthenticated: storedAuth.isAuthenticated,
    isLoading: false,
    error: null,
    lockoutInfo: {
      isLocked: false,
      lockoutDuration: 0,
      remainingAttempts: 0,
      lockoutEndTime: null,
    },
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.lockoutInfo = {
        isLocked: false,
        lockoutDuration: 0,
        remainingAttempts: 0,
        lockoutEndTime: null,
      };
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    clearError: (state) => {
      state.error = null;
      state.lockoutInfo = {
        isLocked: false,
        lockoutDuration: 0,
        remainingAttempts: 0,
        lockoutEndTime: null,
      };
    },
    clearLockout: (state) => {
      state.lockoutInfo = {
        isLocked: false,
        lockoutDuration: 0,
        remainingAttempts: 0,
        lockoutEndTime: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.lockoutInfo = {
          isLocked: false,
          lockoutDuration: 0,
          remainingAttempts: 5,
          lockoutEndTime: null,
        };
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        // Save refresh token if provided
        if (action.payload.data.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            action.payload.data.refreshToken,
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;

        if (typeof action.payload === "object" && action.payload !== null) {
          state.error = action.payload.message;

          // Update lockout info if available
          if (action.payload.isLocked !== undefined) {
            state.lockoutInfo = {
              isLocked: action.payload.isLocked,
              lockoutDuration: action.payload.lockoutDuration || 15,
              remainingAttempts: action.payload.remainingAttempts || 0,
              lockoutEndTime:
                action.payload.lockoutEndTime ||
                (action.payload.isLocked
                  ? new Date(
                      Date.now() +
                        (action.payload.lockoutDuration || 15) * 60 * 1000,
                    )
                  : null),
            };
          } else if (action.payload.remainingAttempts !== undefined) {
            // Update attempt count without lockout
            state.lockoutInfo = {
              ...state.lockoutInfo,
              remainingAttempts: action.payload.remainingAttempts,
              isLocked: false,
            };
          }
        } else {
          state.error = action.payload;
        }
      })
      .addCase(checkLockoutStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkLockoutStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lockoutInfo = {
          isLocked: action.payload.isLocked || false,
          lockoutDuration: action.payload.lockoutDuration || 0,
          remainingAttempts: action.payload.remainingAttempts || 5,
          lockoutEndTime: action.payload.lockoutEndTime || null,
        };
      })
      .addCase(checkLockoutStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        // Save refresh token if provided
        if (action.payload.data.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            action.payload.data.refreshToken,
          );
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update user with new avatar
        if (action.payload.data) {
          state.user = action.payload.data;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearLockout } = authSlice.actions;
export default authSlice.reducer;
