import axiosInstance from "./axiosConfig";

export const uploadAPI = {
  getPresignedUrl: (fileName) =>
    axiosInstance.post("/v1/admin/uploads/presign", { fileName }),

  confirmUpload: (lessonId, objectKey) =>
    axiosInstance.post("/v1/admin/uploads/confirm", { lessonId, objectKey }),

  getStreamingUrl: (objectKey) =>
    axiosInstance.get(`/v1/admin/uploads/streaming-url/${objectKey}`),
};
