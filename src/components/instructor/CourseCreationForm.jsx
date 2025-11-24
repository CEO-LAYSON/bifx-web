import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewCourse } from "../../store/slices/instructorSlice";
import { Upload, X, DollarSign } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

const CourseCreationForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const watchIsFree = watch("isFree", false);
  const watchPrice = watch("priceCents", 0);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const courseData = {
        ...data,
        priceCents: data.isFree ? 0 : parseInt(data.priceCents) * 100,
        level: data.level || "BEGINNER",
        isActive: true,
        thumbnail: thumbnail, // This would be handled by file upload in real implementation
      };

      await dispatch(createNewCourse(courseData)).unwrap();

      reset();
      setThumbnail(null);
      setThumbnailPreview("");
      onSuccess?.();
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseLevels = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Course</h2>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Course Thumbnail
          </label>
          <div className="flex items-center space-x-6">
            {/* Thumbnail Preview */}
            {thumbnailPreview ? (
              <div className="relative">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-32 h-20 object-cover rounded-lg border border-gray-600"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-20 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            )}

            {/* Upload Button */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <div className="px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Upload Thumbnail
                </div>
              </label>
              <p className="text-gray-400 text-xs mt-1">
                Recommended: 1280x720px
              </p>
            </div>
          </div>
        </div>

        {/* Course Title */}
        <Input
          label="Course Title"
          placeholder="e.g., Forex Trading Fundamentals"
          error={errors.title?.message}
          {...register("title", {
            required: "Course title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
        />

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 50,
                message: "Description must be at least 50 characters",
              },
            })}
            rows={4}
            placeholder="Describe what students will learn in this course..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Level
            </label>
            <select
              {...register("level", { required: "Level is required" })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              {courseLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {errors.level && (
              <p className="mt-1 text-sm text-red-500">
                {errors.level.message}
              </p>
            )}
          </div>

          {/* Course Slug */}
          <Input
            label="Course Slug"
            placeholder="forex-trading-fundamentals"
            error={errors.slug?.message}
            {...register("slug", {
              required: "Slug is required",
              pattern: {
                value: /^[a-z0-9-]+$/,
                message:
                  "Slug can only contain lowercase letters, numbers, and hyphens",
              },
            })}
          />
        </div>

        {/* Pricing */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>

          <div className="space-y-4">
            {/* Free/Paid Toggle */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  {...register("isFree")}
                  value={true}
                  className="hidden"
                  id="free-course"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                    watchIsFree ? "border-primary-purple" : "border-gray-500"
                  }`}
                >
                  {watchIsFree && (
                    <div className="w-2 h-2 bg-primary-purple rounded-full" />
                  )}
                </div>
                <span className="text-white">Free Course</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  {...register("isFree")}
                  value={false}
                  className="hidden"
                  id="paid-course"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                    !watchIsFree ? "border-primary-purple" : "border-gray-500"
                  }`}
                >
                  {!watchIsFree && (
                    <div className="w-2 h-2 bg-primary-purple rounded-full" />
                  )}
                </div>
                <span className="text-white">Paid Course</span>
              </label>
            </div>

            {/* Price Input */}
            {!watchIsFree && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Price
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...register("priceCents", {
                      required: !watchIsFree
                        ? "Price is required for paid courses"
                        : false,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                </div>
                {errors.priceCents && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.priceCents.message}
                  </p>
                )}
                {!watchIsFree && watchPrice > 0 && (
                  <p className="text-gray-400 text-xs mt-1">
                    Students will pay: ${watchPrice}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Course Objectives */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What will students learn? (One per line)
          </label>
          <textarea
            {...register("objectives")}
            rows={3}
            placeholder="• Understand forex market basics
• Learn technical analysis techniques
• Develop risk management strategies"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Requirements (One per line)
          </label>
          <textarea
            {...register("requirements")}
            rows={2}
            placeholder="• No prior trading experience required
• Basic computer skills
• Willingness to learn"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4 pt-4 border-t border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setThumbnail(null);
              setThumbnailPreview("");
            }}
            className="flex-1"
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            className="flex-1"
          >
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationForm;
