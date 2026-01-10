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
      // Transform the returned user object to match expected structure
      const userData = response.data.data;
      const transformedUser = {
        ...userData,
        roles: [{ name: `ROLE_${role}` }], // Set the new role as object
        role: `ROLE_${role}`, // For backward compatibility
      };
      return { userId, role, user: transformedUser };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change user role"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await adminAPI.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
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
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data || [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
        const { userId, user } = action.payload;
        const userIndex = state.users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = user;
        }
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
      });
  },
});

export default adminSlice.reducer;
