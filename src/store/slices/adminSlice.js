import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAPI } from "../../services/api/adminAPI";

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchPendingEnrollments = createAsyncThunk(
  "admin/fetchPendingEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getPendingEnrollments();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending enrollments"
      );
    }
  }
);

export const verifyEnrollment = createAsyncThunk(
  "admin/verifyEnrollment",
  async (enrollmentId, { rejectWithValue }) => {
    try {
      const response = await adminAPI.verifyEnrollment(enrollmentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify enrollment"
      );
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "admin/changeUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      let response;
      switch (role) {
        case "ADMIN":
          response = await adminAPI.promoteToAdmin(userId);
          break;
        case "INSTRUCTOR":
          response = await adminAPI.promoteToInstructor(userId);
          break;
        case "USER":
          response = await adminAPI.demoteToUser(userId);
          break;
        default:
          throw new Error("Invalid role");
      }
      return { userId, role, user: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change user role"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardStats: null,
    users: [],
    pendingEnrollments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    removePendingEnrollment: (state, action) => {
      state.pendingEnrollments = state.pendingEnrollments.filter(
        (enrollment) => enrollment.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload.data;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch all users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      // Fetch pending enrollments
      .addCase(fetchPendingEnrollments.fulfilled, (state, action) => {
        state.pendingEnrollments = action.payload.data;
      })
      // Verify enrollment
      .addCase(verifyEnrollment.fulfilled, (state, action) => {
        state.pendingEnrollments = state.pendingEnrollments.filter(
          (enrollment) => enrollment.id !== action.payload.data.id
        );
      })
      // Change user role
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const { userId, role, user } = action.payload;
        const userIndex = state.users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], roles: [role] };
        }
      });
  },
});

export const { clearAdminError, removePendingEnrollment } = adminSlice.actions;
export default adminSlice.reducer;
