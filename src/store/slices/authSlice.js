import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api/authAPI";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({ email, password });
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        // Extract lockout details from error message and headers
        const errorMessage =
          error.response?.data?.message ||
          "Too many login attempts. Please try again in 15 minutes.";

        // Parse lockout duration and attempts from message
        const lockoutMatch = errorMessage.match(
          /try again in (\d+) minutes\. Remaining attempts: (\d+)\./,
        );

        // Get lockout expiry from headers if available
        const lockoutExpiryHeader = error.response?.headers['x-lockout-expiry'];
        const lockoutExpiry = lockoutExpiryHeader ? new Date(parseInt(lockoutExpiryHeader) * 1000) : null;

        if (lockoutMatch) {
          return rejectWithValue({
            message: errorMessage,
            lockoutDuration: parseInt(lockoutMatch[1]),
            remainingAttempts: parseInt(lockoutMatch[2]),
            isLocked: true,
            lockoutEndTime: lockoutExpiry,
          });
        }

        return rejectWithValue({
          message: errorMessage,
          isLocked: true,
          lockoutEndTime: lockoutExpiry,
        });
      }

      // Handle attempt count information
      const attemptMatch = error.response?.data?.message?.match(
        /(\d+) attempts remaining\./,
      );
      if (attemptMatch) {
        return rejectWithValue({
          message: error.response?.data?.message,
          remainingAttempts: parseInt(attemptMatch[1]),
          isLocked: false,
        });
      }

      return rejectWithValue(error.response?.data?.message || "Login failed");
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
      return rejectWithValue(error.response?.data?.message || "Failed to check lockout status");
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
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
              lockoutEndTime: action.payload.lockoutEndTime ||
                (action.payload.isLocked
                  ? new Date(
                      Date.now() + (action.payload.lockoutDuration || 15) * 60 * 1000,
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
