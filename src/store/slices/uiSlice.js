import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  modalOpen: false,
  modalType: null,
  modalData: null,
  loading: false,
  notifications: [],
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
