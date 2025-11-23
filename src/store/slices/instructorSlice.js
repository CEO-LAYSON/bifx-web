import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instructorAPI } from "../../services/api/instructorAPI";

export const fetchInstructorStats = createAsyncThunk(
  "instructor/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getInstructorStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch instructor stats"
      );
    }
  }
);

export const fetchMyCourses = createAsyncThunk(
  "instructor/fetchMyCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getMyCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

export const createNewCourse = createAsyncThunk(
  "instructor/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.createCourse(courseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const updateExistingCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.updateCourse(id, courseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update course"
      );
    }
  }
);

export const fetchCourseStudents = createAsyncThunk(
  "instructor/fetchCourseStudents",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getCourseStudents(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    stats: null,
    courses: [],
    currentCourse: null,
    courseStudents: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearInstructorError: (state) => {
      state.error = null;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch instructor stats
      .addCase(fetchInstructorStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      })
      // Fetch my courses
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.courses = action.payload.data;
      })
      // Create course
      .addCase(createNewCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses.push(action.payload.data);
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update course
      .addCase(updateExistingCourse.fulfilled, (state, action) => {
        const updatedCourse = action.payload.data;
        const index = state.courses.findIndex(
          (course) => course.id === updatedCourse.id
        );
        if (index !== -1) {
          state.courses[index] = updatedCourse;
        }
        if (state.currentCourse?.id === updatedCourse.id) {
          state.currentCourse = updatedCourse;
        }
      })
      // Fetch course students
      .addCase(fetchCourseStudents.fulfilled, (state, action) => {
        const { courseId, students } = action.payload.data;
        state.courseStudents[courseId] = students;
      });
  },
});

export const { clearInstructorError, setCurrentCourse, clearCurrentCourse } =
  instructorSlice.actions;
export default instructorSlice.reducer;
