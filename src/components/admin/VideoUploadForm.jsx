import React, { useState, useRef } from "react";
import { uploadAPI } from "../../../services/api/uploadAPI";
import {
  Upload,
  Video,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

const VideoUploadForm = ({ lessonId, onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
      ];
      if (!validTypes.includes(file.type)) {
        setUploadStatus({
          type: "error",
          message: "Please select a valid video file (MP4, MKV, AVI, MOV, WMV)",
        });
        return;
      }

      // Validate file size (500MB limit)
      if (file.size > 500 * 1024 * 1024) {
        setUploadStatus({
          type: "error",
          message: "File size must be less than 500MB",
        });
        return;
      }

      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        type: "error",
        message: "Please select a file to upload",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    try {
      // Step 1: Get presigned URL
      const presignedResponse = await uploadAPI.getPresignedUrl(
        selectedFile.name,
      );
      const { uploadUrl, objectKey } = presignedResponse.data.data;

      // Step 2: Upload to S3
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener("load", async () => {
        if (xhr.status === 200) {
          // Step 3: Confirm upload
          try {
            await uploadAPI.confirmUpload(lessonId, objectKey);

            setUploadStatus({
              type: "success",
              message: "Video uploaded successfully!",
            });

            setSelectedFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }

            onUploadComplete?.(objectKey);
          } catch (error) {
            setUploadStatus({
              type: "error",
              message:
                "Failed to confirm upload: " +
                (error.response?.data?.message || error.message),
            });
          }
        } else {
          setUploadStatus({
            type: "error",
            message: "Upload failed. Please try again.",
          });
        }
        setIsUploading(false);
      });

      xhr.addEventListener("error", () => {
        setUploadStatus({
          type: "error",
          message: "Upload failed. Please check your connection and try again.",
        });
        setIsUploading(false);
      });

      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", selectedFile.type);
      xhr.send(selectedFile);
    } catch (error) {
      setUploadStatus({
        type: "error",
        message:
          error.response?.data?.message || "Failed to start upload process",
      });
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Video className="mr-3 text-primary-purple" size={24} />
        Upload Video Content
      </h3>

      {/* Upload Status */}
      {uploadStatus && (
        <Alert
          type={uploadStatus.type}
          message={uploadStatus.message}
          className="mb-6"
        />
      )}

      {/* File Selection */}
      <div className="space-y-6">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Video File
          </label>
          <div className="flex items-center space-x-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-primary-purple transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <div className="text-white font-medium mb-1">
                  Click to select video file
                </div>
                <div className="text-gray-400 text-sm">
                  MP4, MKV, AVI, MOV, WMV (Max 500MB)
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary-gold" />
                <div>
                  <div className="text-white font-medium">
                    {selectedFile.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Uploading...</span>
              <span className="text-white font-semibold">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-purple to-primary-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          loading={isUploading}
          variant="primary"
          className="w-full"
        >
          {isUploading ? (
            <>
              <Upload className="mr-2" size={16} />
              Uploading... {Math.round(uploadProgress)}%
            </>
          ) : (
            <>
              <Video className="mr-2" size={16} />
              Upload Video
            </>
          )}
        </Button>

        {/* Help Text */}
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <strong>Note:</strong> Video uploads may take several minutes
              depending on file size and internet connection. Do not close this
              window during upload.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadForm;
