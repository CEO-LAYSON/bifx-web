import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { progressAPI } from "../../services/api/progressAPI";

export const updateLessonProgress = createAsyncThunk(
  "progress/update",
  async (progressData, { rejectWithValue }) => {
    try {
      const response = await progressAPI.updateProgress(progressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update progress"
      );
    }
  }
);

export const fetchCourseProgress = createAsyncThunk(
  "progress/fetchCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await progressAPI.getCourseProgress(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch progress"
      );
    }
  }
);

export const fetchLessonProgress = createAsyncThunk(
  "progress/fetchLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await progressAPI.getLessonProgress(lessonId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lesson progress"
      );
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    courseProgress: {},
    lessonProgress: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearProgressError: (state) => {
      state.error = null;
    },
    setLessonProgress: (state, action) => {
      const { lessonId, progress } = action.payload;
      state.lessonProgress[lessonId] = progress;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update progress
      .addCase(updateLessonProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLessonProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lessonId, progressPercentage } = action.payload.data;
        state.lessonProgress[lessonId] = progressPercentage;
      })
      .addCase(updateLessonProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch course progress
      .addCase(fetchCourseProgress.fulfilled, (state, action) => {
        const { courseId, progress } = action.payload.data;
        state.courseProgress[courseId] = progress;
      })
      // Fetch lesson progress
      .addCase(fetchLessonProgress.fulfilled, (state, action) => {
        const { lessonId, progress } = action.payload.data;
        state.lessonProgress[lessonId] = progress;
      });
  },
});

export const { clearProgressError, setLessonProgress } = progressSlice.actions;
export default progressSlice.reducer;
