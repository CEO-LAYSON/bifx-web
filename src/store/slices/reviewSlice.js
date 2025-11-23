import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviewAPI } from "../../services/api/reviewAPI";

export const fetchCourseReviews = createAsyncThunk(
  "reviews/fetchCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getCourseReviews(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.createReview(reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review"
      );
    }
  }
);

export const fetchPendingReviews = createAsyncThunk(
  "reviews/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getPendingReviews();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending reviews"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    courseReviews: {},
    pendingReviews: [],
    userReviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    addReviewToCourse: (state, action) => {
      const { courseId, review } = action.payload;
      if (!state.courseReviews[courseId]) {
        state.courseReviews[courseId] = [];
      }
      state.courseReviews[courseId].push(review);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch course reviews
      .addCase(fetchCourseReviews.fulfilled, (state, action) => {
        const { courseId, reviews } = action.payload.data;
        state.courseReviews[courseId] = reviews;
      })
      // Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const review = action.payload.data;
        if (!state.courseReviews[review.courseId]) {
          state.courseReviews[review.courseId] = [];
        }
        state.courseReviews[review.courseId].push(review);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch pending reviews
      .addCase(fetchPendingReviews.fulfilled, (state, action) => {
        state.pendingReviews = action.payload.data;
      });
  },
});

export const { clearReviewError, addReviewToCourse } = reviewSlice.actions;
export default reviewSlice.reducer;
