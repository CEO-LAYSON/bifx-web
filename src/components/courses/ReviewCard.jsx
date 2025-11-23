import React from "react";
import {
  Star,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";

const ReviewCard = ({
  review,
  isOwner = false,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
        }
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold">
            {review.user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="text-white font-semibold">
              {review.user?.fullName || "Anonymous"}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span>•</span>
              <span>{formatDate(review.createdAt)}</span>

              {/* Review Status */}
              {review.status === "PENDING" && (
                <>
                  <span>•</span>
                  <div className="flex items-center text-yellow-400">
                    <Clock size={12} className="mr-1" />
                    <span className="text-xs">Pending</span>
                  </div>
                </>
              )}

              {review.status === "APPROVED" && (
                <>
                  <span>•</span>
                  <div className="flex items-center text-green-400">
                    <CheckCircle size={12} className="mr-1" />
                    <span className="text-xs">Verified</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && isOwner && (
          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={16} />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-6 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-32 hidden group-hover:block">
              <div className="p-1">
                <button
                  onClick={() => onEdit?.(review)}
                  className="flex items-center w-full px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors"
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(review.id)}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="text-gray-300 leading-relaxed">{review.comment}</div>

      {/* Review Metadata */}
      {review.courseProgress && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>Course Progress: {review.courseProgress}%</span>
            <span>•</span>
            <span>Helpful: {review.helpfulCount || 0}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
