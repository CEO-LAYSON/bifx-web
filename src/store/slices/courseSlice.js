import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCourseSuccess: (state, action) => {
      state.loading = false;
      state.currentCourse = action.payload;
    },
    fetchCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    enrollCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    enrollCourseSuccess: (state, action) => {
      state.loading = false;
      state.enrolledCourses.push(action.payload);
    },
    enrollCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchCourseStart,
  fetchCourseSuccess,
  fetchCourseFailure,
  enrollCourseStart,
  enrollCourseSuccess,
  enrollCourseFailure,
  clearError,
} = courseSlice.actions;
export default courseSlice.reducer;
