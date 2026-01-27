import axiosInstance from "./axiosConfig";

export const uploadAPI = {
  getPresignedUrl: (filename, fileType) =>
    axiosInstance.post("/v1/admin/uploads/presign", { filename, fileType }),

  confirmUpload: (lessonId, objectKey) =>
    axiosInstance.post("/v1/admin/uploads/confirm", { lessonId, objectKey }),

  getStreamingUrl: (objectKey) =>
    axiosInstance.get(`/v1/admin/uploads/streaming-url/${objectKey}`),
};

export const instructorUploadAPI = {
  getPresignedUrl: (filename, fileType) =>
    axiosInstance.post("/v1/instructor/uploads/presign", {
      filename,
      fileType,
    }),

  uploadFileDirectly: (file, fileType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);
    return axiosInstance.post("/v1/instructor/uploads/direct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  confirmUpload: (
    lessonId,
    objectKey,
    thumbnailObjectKey,
    title,
    description,
    durationSeconds,
  ) =>
    axiosInstance.post("/v1/instructor/uploads/confirm", {
      lessonId,
      objectKey,
      thumbnailObjectKey,
      title,
      description,
      durationSeconds,
    }),

  getStreamingUrl: (objectKey) =>
    axiosInstance.get(`/v1/instructor/uploads/streaming-url/${objectKey}`),
};
