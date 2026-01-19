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
        error.response?.data?.message || "Failed to fetch instructor stats",
      );
    }
  },
);

export const fetchMyCourses = createAsyncThunk(
  "instructor/fetchMyCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getMyCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses",
      );
    }
  },
);

export const createNewCourse = createAsyncThunk(
  "instructor/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.createCourse(courseData);
      return response.data;
    } catch (error) {
      // Return detailed error information including validation errors
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to create course" });
    }
  },
);

export const updateExistingCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.updateCourse(id, courseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update course",
      );
    }
  },
);

export const deleteExistingCourse = createAsyncThunk(
  "instructor/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.deleteCourse(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete course",
      );
    }
  },
);

export const fetchCourseDetails = createAsyncThunk(
  "instructor/fetchCourseDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getCourseDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course details",
      );
    }
  },
);

export const createNewLesson = createAsyncThunk(
  "instructor/createLesson",
  async ({ courseId, lessonData }, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.createLesson(courseId, lessonData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create lesson",
      );
    }
  },
);

export const updateExistingLesson = createAsyncThunk(
  "instructor/updateLesson",
  async ({ lessonId, lessonData }, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.updateLesson(lessonId, lessonData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lesson",
      );
    }
  },
);

export const deleteExistingLesson = createAsyncThunk(
  "instructor/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.deleteLesson(lessonId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lesson",
      );
    }
  },
);

export const fetchCourseLessons = createAsyncThunk(
  "instructor/fetchCourseLessons",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getCourseLessons(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lessons",
      );
    }
  },
);

export const fetchCourseStudents = createAsyncThunk(
  "instructor/fetchCourseStudents",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getCourseStudents(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students",
      );
    }
  },
);

export const fetchStudentProgress = createAsyncThunk(
  "instructor/fetchStudentProgress",
  async ({ courseId, studentId }, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getStudentProgress(
        courseId,
        studentId,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch student progress",
      );
    }
  },
);

export const fetchCoursePerformance = createAsyncThunk(
  "instructor/fetchCoursePerformance",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await instructorAPI.getCoursePerformance(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course performance",
      );
    }
  },
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    stats: null,
    courses: [],
    currentCourse: null,
    courseLessons: {},
    courseStudents: {},
    studentProgress: {},
    coursePerformance: {},
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
          (course) => course.id === updatedCourse.id,
        );
        if (index !== -1) {
          state.courses[index] = updatedCourse;
        }
        if (state.currentCourse?.id === updatedCourse.id) {
          state.currentCourse = updatedCourse;
        }
      })
      // Delete course
      .addCase(deleteExistingCourse.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.courses = state.courses.filter(
          (course) => course.id !== courseId,
        );
        if (state.currentCourse?.id === courseId) {
          state.currentCourse = null;
        }
      })
      // Fetch course details
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.currentCourse = action.payload.data;
      })
      // Fetch course lessons
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.courseLessons[courseId] = action.payload.data;
      })
      // Create lesson
      .addCase(createNewLesson.fulfilled, (state, action) => {
        const { courseId } = action.meta.arg;
        if (!state.courseLessons[courseId]) {
          state.courseLessons[courseId] = [];
        }
        state.courseLessons[courseId].push(action.payload.data);
      })
      // Update lesson
      .addCase(updateExistingLesson.fulfilled, (state, action) => {
        const { lessonId } = action.meta.arg;
        // Find and update lesson in all courses
        Object.keys(state.courseLessons).forEach((courseId) => {
          const lessonIndex = state.courseLessons[courseId].findIndex(
            (lesson) => lesson.id === lessonId,
          );
          if (lessonIndex !== -1) {
            state.courseLessons[courseId][lessonIndex] = action.payload.data;
          }
        });
      })
      // Delete lesson
      .addCase(deleteExistingLesson.fulfilled, (state, action) => {
        const lessonId = action.meta.arg;
        // Find and remove lesson from all courses
        Object.keys(state.courseLessons).forEach((courseId) => {
          state.courseLessons[courseId] = state.courseLessons[courseId].filter(
            (lesson) => lesson.id !== lessonId,
          );
        });
      })
      // Fetch course students
      .addCase(fetchCourseStudents.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.courseStudents[courseId] = action.payload.data;
      })
      // Fetch student progress
      .addCase(fetchStudentProgress.fulfilled, (state, action) => {
        const { courseId, studentId } = action.meta.arg;
        if (!state.studentProgress[courseId]) {
          state.studentProgress[courseId] = {};
        }
        state.studentProgress[courseId][studentId] = action.payload.data;
      })
      // Fetch course performance
      .addCase(fetchCoursePerformance.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.coursePerformance[courseId] = action.payload.data;
      });
  },
});

export const { clearInstructorError, setCurrentCourse, clearCurrentCourse } =
  instructorSlice.actions;
export default instructorSlice.reducer;
