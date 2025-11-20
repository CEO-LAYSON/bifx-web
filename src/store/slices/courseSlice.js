import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseAPI } from "../../services/api/courseAPI";

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getAllCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourseById(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course"
      );
    }
  }
);

export const fetchCourseWithLessons = createAsyncThunk(
  "courses/fetchWithLessons",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourseWithLessons(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course with lessons"
      );
    }
  }
);

export const fetchFreeCourses = createAsyncThunk(
  "courses/fetchFree",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getFreeCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch free courses"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    currentCourse: null,
    freeCourses: [],
    enrolledCourses: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.data;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload.data[0]; // Adjust based on your API response
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch course with lessons
      .addCase(fetchCourseWithLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseWithLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload.data;
      })
      .addCase(fetchCourseWithLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch free courses
      .addCase(fetchFreeCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFreeCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.freeCourses = action.payload.data;
      })
      .addCase(fetchFreeCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCourse, clearError, setEnrolledCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
