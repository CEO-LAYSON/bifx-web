import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../store/slices/reviewSlice";
import { Star, Send } from "lucide-react";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

const ReviewForm = ({ courseId, onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const comment = watch("comment", "");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const onSubmit = async (data) => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData = {
        courseId,
        rating,
        comment: data.comment,
        isAnonymous: data.isAnonymous || false,
      };

      await dispatch(createReview(reviewData)).unwrap();

      reset();
      setRating(0);
      onSuccess?.();
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>

      {error && <Alert type="error" message={error} className="mb-4" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Your Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={
                    star <= displayRating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }
                />
              </button>
            ))}
            <span className="ml-3 text-white font-semibold">
              {rating > 0 ? `${rating}.0` : "Select rating"}
            </span>
          </div>
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Review
          </label>
          <textarea
            {...register("comment", {
              required: "Review comment is required",
              minLength: {
                value: 10,
                message: "Review must be at least 10 characters long",
              },
              maxLength: {
                value: 1000,
                message: "Review cannot exceed 1000 characters",
              },
            })}
            rows={4}
            placeholder="Share your experience with this course. What did you like? What could be improved?"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-500">
              {errors.comment.message}
            </p>
          )}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Minimum 10 characters</span>
            <span>{comment.length}/1000</span>
          </div>
        </div>

        {/* Anonymous Option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("isAnonymous")}
            id="anonymous-review"
            className="mr-2"
          />
          <label htmlFor="anonymous-review" className="text-sm text-gray-300">
            Post anonymously
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={rating === 0 || comment.length < 10}
          className="w-full"
        >
          <Send size={16} className="mr-2" />
          Submit Review
        </Button>

        {/* Review Guidelines */}
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600">
          <h4 className="text-sm font-semibold text-white mb-2">
            Review Guidelines
          </h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Focus on the course content and instructor</li>
            <li>• Avoid personal attacks or offensive language</li>
            <li>• Reviews are subject to moderation</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
