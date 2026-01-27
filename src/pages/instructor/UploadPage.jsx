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
  const [uploadMethod, setUploadMethod] = useState("presigned"); // presigned or direct

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
      // Validate file type
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

      // Validate file size (500MB limit)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        setUploadStatus({
          type: "error",
          message: "File size must be less than 500MB",
        });
        return;
      }

      setSelectedFile(file);
      setUploadStatus(null);

      // Extract duration if possible
      if (file.type.startsWith("video/")) {
        extractVideoDuration(file);
      }
    }
  };

  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate thumbnail file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setUploadStatus({
          type: "error",
          message: "Please select a valid image file (JPEG, PNG, WebP)",
        });
        return;
      }

      // Validate file size (5MB limit for thumbnails)
      const maxSize = 5 * 1024 * 1024; // 5MB
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

      // Upload video file
      if (uploadMethod === "presigned") {
        // Step 1: Get presigned URL for video
        const presignedResponse = await instructorUploadAPI.getPresignedUrl(
          selectedFile.name,
          "VIDEO",
        );
        const { uploadUrl, objectKey } = presignedResponse.data.data;
        videoObjectKey = objectKey;

        // Step 2: Upload video to S3
        await uploadToS3(uploadUrl, selectedFile);
      } else {
        // Direct upload
        const directResponse = await instructorUploadAPI.uploadFileDirectly(
          selectedFile,
          "VIDEO",
        );
        videoObjectKey = directResponse.data.data.objectKey;
      }

      // Upload thumbnail if provided
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

      // Step 3: Confirm upload and update/create lesson
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

      // Reset form
      setSelectedFile(null);
      setSelectedThumbnail(null);
      setLessonTitle("");
      setLessonDescription("");
      setDuration("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";

      // Navigate back to course details
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Upload className="mr-3 text-primary-purple" size={32} />
          Upload Content
        </h1>
        <p className="text-gray-400">
          Upload video content to your courses and lessons
        </p>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <Alert
          type={uploadStatus.type}
          message={uploadStatus.message}
          className="mb-6"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Configuration */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">
              Upload Settings
            </h3>

            {/* Course Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Course *
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  disabled={isUploading}
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson Selection */}
              {selectedCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Lesson (Optional)
                  </label>
                  <select
                    value={selectedLesson}
                    onChange={(e) => setSelectedLesson(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-purple focus:border-transparent"
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
                </div>
              )}

              {/* New Lesson Details */}
              {selectedCourse && !selectedLesson && (
                <>
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
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
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
                </>
              )}

              {/* Upload Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="presigned"
                      checked={uploadMethod === "presigned"}
                      onChange={(e) => setUploadMethod(e.target.value)}
                      className="mr-2"
                      disabled={isUploading}
                    />
                    <span className="text-gray-300">Presigned URL</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="direct"
                      checked={uploadMethod === "direct"}
                      onChange={(e) => setUploadMethod(e.target.value)}
                      className="mr-2"
                      disabled={isUploading}
                    />
                    <span className="text-gray-300">Direct Upload</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-6">
          {/* Video Upload */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Video className="mr-3 text-primary-purple" size={24} />
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
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-primary-purple transition-colors"
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-white font-medium">
                    Click to select video file
                  </div>
                  <div className="text-gray-400 text-sm">
                    MP4, MKV, AVI, MOV, WMV, WebM (Max 500MB)
                  </div>
                </div>
              </label>
            </div>

            {/* Selected Video Info */}
            {selectedFile && (
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Play className="h-8 w-8 text-primary-gold" />
                    <div>
                      <div className="text-white font-medium">
                        {selectedFile.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatFileSize(selectedFile.size)} •{" "}
                        {selectedFile.type}
                        {duration && ` • ${formatDuration(parseInt(duration))}`}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    disabled={isUploading}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Image className="mr-3 text-primary-purple" size={24} />
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
                className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-primary-purple transition-colors"
              >
                <div className="text-center">
                  <Image className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-white font-medium text-sm">
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
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image className="h-6 w-6 text-primary-gold" />
                    <div>
                      <div className="text-white font-medium text-sm">
                        {selectedThumbnail.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {formatFileSize(selectedThumbnail.size)} •{" "}
                        {selectedThumbnail.type}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedThumbnail(null);
                      if (thumbnailInputRef.current)
                        thumbnailInputRef.current.value = "";
                    }}
                    disabled={isUploading}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Uploading...</span>
              <span className="text-white font-semibold">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-purple to-primary-gold h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock size={16} />
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
          className="px-12"
        >
          {isUploading ? (
            <>
              <Upload className="mr-2" size={20} />
              Uploading... {Math.round(uploadProgress)}%
            </>
          ) : (
            <>
              <Video className="mr-2" size={20} />
              Upload Content
            </>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <strong>Upload Tips:</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>
                Video uploads may take several minutes depending on file size
              </li>
              <li>Supported formats: MP4, MKV, AVI, MOV, WMV, WebM</li>
              <li>Maximum file size: 500MB for videos, 5MB for thumbnails</li>
              <li>Do not close this page during upload</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorUploadPage;
