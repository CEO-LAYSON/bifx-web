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

export const fetchCourseProgressSummary = createAsyncThunk(
  "progress/fetchCourseSummary",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await progressAPI.getCourseProgressSummary(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch progress summary"
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
      // Fetch course progress summary
      .addCase(fetchCourseProgressSummary.fulfilled, (state, action) => {
        const summary = action.payload.data;
        state.courseProgress[summary.courseId] = {
          completedLessons: summary.completedLessons,
          totalLessons: summary.totalLessons,
          progressPercentage: Math.round(summary.overallProgress * 100),
          totalDuration: 0, // Not provided in summary
          timeSpent: 0, // Not provided
        };
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
