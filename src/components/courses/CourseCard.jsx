import React from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, Lock } from "lucide-react";

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    description,
    thumbnailUrl,
    level,
    lessonCount,
    totalDuration,
    isFree,
    isPremium,
    price,
    priceCents,
  } = course;

  const formatPrice = (price, priceCents) => {
    if (isFree) return "Free";
    return `$${price || priceCents / 100}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "0m";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary-purple transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Course Thumbnail */}
      <div className="relative">
        <img
          src={thumbnailUrl || "/placeholder-course.jpg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {!isFree && (
          <div className="absolute top-3 right-3">
            <div className="bg-primary-gold text-black px-2 py-1 rounded-full text-xs font-bold">
              PREMIUM
            </div>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              level === "BEGINNER"
                ? "bg-green-500 text-white"
                : level === "INTERMEDIATE"
                ? "bg-yellow-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {level}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1" />
              <span>{lessonCount || 0} lessons</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-white">
            {formatPrice(price, priceCents)}
          </div>

          <Link
            to={`/courses/${id}`}
            className="bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            {isFree ? "Enroll Free" : "View Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
