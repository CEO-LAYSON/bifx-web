import axiosInstance from "./axiosConfig";

export const uploadAPI = {
  getPresignedUrl: (filename, fileType) =>
    axiosInstance.post("/v1/admin/uploads/presign", { filename, fileType }),

  confirmUpload: (lessonId, objectKey) =>
    axiosInstance.post("/v1/admin/uploads/confirm", { lessonId, objectKey }),

  getStreamingUrl: (objectKey) =>
    axiosInstance.get(`/v1/admin/uploads/streaming-url/${objectKey}`),
};
