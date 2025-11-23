import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import progressReducer from "./slices/progressSlice";
import adminReducer from "./slices/adminSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    courses: courseReducer,
    progress: progressReducer,
    admin: adminReducer,
    ui: uiReducer,
  },
});

export default store;
