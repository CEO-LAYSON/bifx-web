import axiosInstance from "./axiosConfig";

export const liveMeetingAPI = {
  // User endpoints
  getLiveMeetings: () => axiosInstance.get("/v1/live-meetings"),

  getUpcomingMeetings: () => axiosInstance.get("/v1/live-meetings/upcoming"),

  joinMeeting: (meetingId) =>
    axiosInstance.post(`/v1/live-meetings/${meetingId}/join`),

  // Admin/Instructor endpoints
  createMeeting: (meetingData) =>
    axiosInstance.post("/v1/admin/live-meetings", meetingData),

  updateMeeting: (meetingId, meetingData) =>
    axiosInstance.put(`/v1/admin/live-meetings/${meetingId}`, meetingData),

  deleteMeeting: (meetingId) =>
    axiosInstance.delete(`/v1/admin/live-meetings/${meetingId}`),

  getMyMeetings: () => axiosInstance.get("/v1/instructor/live-meetings"),
};
