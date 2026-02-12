import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instructorUploadAPI } from "../../services/api/uploadAPI";
import { instructorAPI } from "../../services/api/instructorAPI";
import {
  Upload,
  Video,
  Image,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Play,
  Clock,
  Sparkles,
  UploadCloud,
  FileVideo,
  Settings,
  ChevronDown,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Input from "../../components/ui/Input";

const InstructorUploadPage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [uploadMethod, setUploadMethod] = useState("presigned");
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadLessons(selectedCourse);
    } else {
      setLessons([]);
      setSelectedLesson("");
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      const response = await instructorAPI.getMyCourses();
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error loading courses:", error);
      setUploadStatus({
        type: "error",
        message: "Failed to load courses. Please try again.",
      });
    }
  };

  const loadLessons = async (courseId) => {
    try {
      const response = await instructorAPI.getCourseLessons(courseId);
      setLessons(response.data.data || []);
    } catch (error) {
      console.error("Error loading lessons:", error);
      setLessons([]);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [
        "video/mp4",
        "video/mkv",
        "video/avi",
        "video/mov",
        "video/wmv",
        "video/webm",
      ];
      if (!validTypes.includes(file.type)) {
        setUploadStatus({
          type: "error",
          message:
            "Please select a valid video file (MP4, MKV, AVI, MOV, WMV, WebM)",
        });
        return;
      }

      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadStatus({
          type: "error",
          message: "File size must be less than 500MB",
        });
        return;
      }

      setSelectedFile(file);
      setUploadStatus(null);

      if (file.type.startsWith("video/")) {
        extractVideoDuration(file);
      }
    }
  };

  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setUploadStatus({
          type: "error",
          message: "Please select a valid image file (JPEG, PNG, WebP)",
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadStatus({
          type: "error",
          message: "Thumbnail size must be less than 5MB",
        });
        return;
      }

      setSelectedThumbnail(file);
      setUploadStatus(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } };
      handleFileSelect(event);
    }
  };

  const extractVideoDuration = (file) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const duration = Math.floor(video.duration);
      setDuration(duration.toString());
      URL.revokeObjectURL(video.src);
    };

    video.src = URL.createObjectURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        type: "error",
        message: "Please select a video file to upload",
      });
      return;
    }

    if (!selectedCourse) {
      setUploadStatus({
        type: "error",
        message: "Please select a course",
      });
      return;
    }

    if (!selectedLesson && !lessonTitle.trim()) {
      setUploadStatus({
        type: "error",
        message:
          "Please select an existing lesson or provide a new lesson title",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    try {
      let videoObjectKey = null;
      let thumbnailObjectKey = null;

      if (uploadMethod === "presigned") {
        const presignedResponse = await instructorUploadAPI.getPresignedUrl(
          selectedFile.name,
          "VIDEO",
        );
        const { uploadUrl, objectKey } = presignedResponse.data.data;
        videoObjectKey = objectKey;

        await uploadToS3(uploadUrl, selectedFile);
      } else {
        const directResponse = await instructorUploadAPI.uploadFileDirectly(
          selectedFile,
          "VIDEO",
        );
        videoObjectKey = directResponse.data.data.objectKey;
      }

      if (selectedThumbnail) {
        if (uploadMethod === "presigned") {
          const thumbPresignedResponse =
            await instructorUploadAPI.getPresignedUrl(
              selectedThumbnail.name,
              "THUMBNAIL",
            );
          const { uploadUrl: thumbUploadUrl, objectKey: thumbObjectKey } =
            thumbPresignedResponse.data.data;
          thumbnailObjectKey = thumbObjectKey;

          await uploadToS3(thumbUploadUrl, selectedThumbnail);
        } else {
          const thumbDirectResponse =
            await instructorUploadAPI.uploadFileDirectly(
              selectedThumbnail,
              "THUMBNAIL",
            );
          thumbnailObjectKey = thumbDirectResponse.data.data.objectKey;
        }
      }

      const lessonId = selectedLesson || null;
      const title = selectedLesson ? null : lessonTitle.trim();
      const description = selectedLesson ? null : lessonDescription.trim();
      const durationSeconds = duration ? parseInt(duration) : null;

      await instructorUploadAPI.confirmUpload(
        lessonId,
        videoObjectKey,
        thumbnailObjectKey,
        title,
        description,
        durationSeconds,
      );

      setUploadStatus({
        type: "success",
        message: "Video uploaded and lesson updated successfully!",
      });

      setSelectedFile(null);
      setSelectedThumbnail(null);
      setLessonTitle("");
      setLessonDescription("");
      setDuration("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";

      setTimeout(() => {
        navigate(`/instructor/courses/${selectedCourse}`);
      }, 2000);
    } catch (error) {
      setUploadStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to upload video. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const uploadToS3 = (uploadUrl, file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2260%22%20height%3D%2260%22%20fill%3D%22none%22%20stroke%3D%22rgba%28139%2C92%2C246%2C0.05%29%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-gold-600/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "60s" }}
        ></div>
      </div>

      <div className="relative max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-gold-600/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl"></div>

          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-3">
                <UploadCloud className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                Upload Content
                <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
              </h1>
              <p className="text-gray-400 mt-1">
                Upload video content to your courses and lessons
              </p>
            </div>
          </div>
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div className="relative animate-fade-up">
            <Alert
              type={uploadStatus.type}
              message={uploadStatus.message}
              className="mb-6"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Configuration */}
          <div className="space-y-6">
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:border-purple-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-transparent"></div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg p-2">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                </div>
                Upload Settings
                <Sparkles className="w-4 h-4 text-gold-400" />
              </h3>

              {/* Course Selection */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Course *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                      disabled={isUploading}
                    >
                      <option value="">Choose a course...</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Lesson Selection */}
                {selectedCourse && (
                  <div className="relative animate-fade-up">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Lesson (Optional)
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLesson}
                        onChange={(e) => setSelectedLesson(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                        disabled={isUploading}
                      >
                        <option value="">
                          Choose existing lesson or create new...
                        </option>
                        {lessons.map((lesson) => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* New Lesson Details */}
                {selectedCourse && !selectedLesson && (
                  <>
                    <div className="animate-fade-up space-y-4">
                      <Input
                        label="Lesson Title *"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="Enter lesson title"
                        disabled={isUploading}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Lesson Description
                        </label>
                        <textarea
                          value={lessonDescription}
                          onChange={(e) => setLessonDescription(e.target.value)}
                          placeholder="Enter lesson description"
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none hover:border-purple-500/50 transition-all duration-300"
                          disabled={isUploading}
                        />
                      </div>

                      <Input
                        label="Duration (seconds)"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Auto-detected or enter manually"
                        disabled={isUploading}
                      />
                    </div>
                  </>
                )}

                {/* Upload Method */}
                <div className="relative pt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Upload Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        value="presigned"
                        checked={uploadMethod === "presigned"}
                        onChange={(e) => setUploadMethod(e.target.value)}
                        className="peer sr-only"
                        disabled={isUploading}
                      />
                      <div className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/60 text-gray-400 peer-checked:border-purple-500 peer-checked:bg-purple-500/10 peer-checked:text-white transition-all duration-300 hover:border-purple-500/50 text-center flex items-center justify-center gap-2">
                        <UploadCloud className="w-4 h-4" />
                        Presigned URL
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        value="direct"
                        checked={uploadMethod === "direct"}
                        onChange={(e) => setUploadMethod(e.target.value)}
                        className="peer sr-only"
                        disabled={isUploading}
                      />
                      <div className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/60 text-gray-400 peer-checked:border-purple-500 peer-checked:bg-purple-500/10 peer-checked:text-white transition-all duration-300 hover:border-purple-500/50 text-center flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Direct Upload
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-6">
            {/* Video Upload */}
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:border-purple-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-transparent"></div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg p-2">
                    <FileVideo className="w-5 h-5 text-white" />
                  </div>
                </div>
                Video File
              </h3>

              {/* File Input */}
              <div className="mb-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="video-upload"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative flex items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-500 overflow-hidden ${
                    isDragOver
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700 hover:border-purple-500/50 hover:bg-gray-900/60"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    className={`absolute inset-0 border-2 border-purple-500/30 rounded-2xl opacity-0 transition-opacity duration-300 ${
                      isDragOver ? "opacity-100" : ""
                    }`}
                  ></div>

                  <div className="relative text-center">
                    <div
                      className={`relative mx-auto mb-4 transition-all duration-500 ${
                        isDragOver ? "scale-110" : "scale-100"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full blur-lg opacity-75 transition-opacity duration-300 ${
                          isDragOver ? "opacity-100" : "opacity-50"
                        }`}
                      ></div>
                      <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-full p-4">
                        <Upload
                          className={`w-10 h-10 text-white transition-transform duration-500 ${
                            isDragOver ? "animate-bounce" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-white font-medium text-lg mb-2">
                      {isDragOver
                        ? "Drop your video here"
                        : "Click to select video file"}
                    </div>
                    <div className="text-gray-400 text-sm">
                      MP4, MKV, AVI, MOV, WMV, WebM (Max 500MB)
                    </div>
                  </div>
                </label>
              </div>

              {/* Selected Video Info */}
              {selectedFile && (
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 animate-fade-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium max-w-[200px] truncate">
                          {selectedFile.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formatFileSize(selectedFile.size)} •{" "}
                          {selectedFile.type.split("/")[1].toUpperCase()}
                          {duration &&
                            ` • ${formatDuration(parseInt(duration))}`}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      disabled={isUploading}
                      className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:border-purple-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600/5 via-transparent to-transparent"></div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-gold-500 to-amber-500 rounded-lg p-2">
                    <Image className="w-5 h-5 text-white" />
                  </div>
                </div>
                Thumbnail (Optional)
              </h3>

              <div className="mb-4">
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                  id="thumbnail-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="relative flex items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-gray-700 hover:border-gold-500/50 cursor-pointer transition-all duration-300 hover:bg-gray-900/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="relative mx-auto mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full blur-lg opacity-50"></div>
                      <div className="relative bg-gradient-to-br from-gold-500 to-amber-500 rounded-full p-3">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-white font-medium text-sm mb-1">
                      Click to select thumbnail
                    </div>
                    <div className="text-gray-400 text-xs">
                      JPEG, PNG, WebP (Max 5MB)
                    </div>
                  </div>
                </label>
              </div>

              {/* Selected Thumbnail Info */}
              {selectedThumbnail && (
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 animate-fade-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-gold-500 to-amber-500 rounded-lg p-2">
                          <Image className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm max-w-[180px] truncate">
                          {selectedThumbnail.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {formatFileSize(selectedThumbnail.size)} •{" "}
                          {selectedThumbnail.type.split("/")[1].toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedThumbnail(null);
                        if (thumbnailInputRef.current)
                          thumbnailInputRef.current.value = "";
                      }}
                      disabled={isUploading}
                      className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl animate-fade-up">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
                  </div>
                  Uploading...
                </span>
                <span className="text-white font-semibold text-lg">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="relative h-4 bg-gray-900/60 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-gold-600/20 rounded-full"></div>
                <div
                  className="relative h-full bg-gradient-to-r from-purple-600 via-purple-400 to-gold-500 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div
                    className="absolute inset-0 bg-white/20 animate-shimmer rounded-full"
                    style={{ backgroundPosition: "200% 0" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="text-sm">
                  Please wait while your content is being uploaded...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !selectedCourse || isUploading}
            loading={isUploading}
            variant="primary"
            size="lg"
            className="px-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-gold-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            {isUploading ? (
              <span className="relative flex items-center gap-2">
                <div className="relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                </div>
                Uploading... {Math.round(uploadProgress)}%
              </span>
            ) : (
              <span className="relative flex items-center gap-2">
                <UploadCloud className="w-5 h-5" />
                Upload Content
                <Sparkles className="w-4 h-4 animate-pulse" />
              </span>
            )}
          </Button>
        </div>

        {/* Help Text */}
        <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 via-transparent to-orange-600/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600/50 via-gold-500/50 to-orange-600/50 rounded-t-2xl"></div>
          <div className="relative flex items-start space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-lg blur opacity-50"></div>
              <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg p-2">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-300">
                <strong className="text-white">Upload Tips:</strong>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                    Video uploads may take several minutes depending on file
                    size
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                    Supported formats: MP4, MKV, AVI, MOV, WMV, WebM
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                    Maximum file size: 500MB for videos, 5MB for thumbnails
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                    Do not close this page during upload
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorUploadPage;
