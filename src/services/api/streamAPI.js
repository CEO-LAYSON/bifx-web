import axiosInstance from "./axiosConfig";

export const streamAPI = {
  getStreamingUrl: (lessonId) =>
    axiosInstance.get(`/v1/stream/lesson/${lessonId}`),

  getPresignedUploadUrl: (fileName) =>
    axiosInstance.post("/v1/admin/uploads/presign", { fileName }),

  confirmUpload: (lessonId, objectKey) =>
    axiosInstance.post("/v1/admin/uploads/confirm", { lessonId, objectKey }),
};
