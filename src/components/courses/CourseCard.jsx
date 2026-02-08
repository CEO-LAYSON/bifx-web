import React from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, Lock, Play } from "lucide-react";

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

  const getLevelColor = (level) => {
    switch (level) {
      case "BEGINNER":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "INTERMEDIATE":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case "ADVANCED":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary-purple/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnailUrl || "/placeholder-course.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 bg-primary-purple/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play size={28} className="text-white ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!isFree && (
            <div className="bg-gradient-to-r from-primary-gold to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              PREMIUM
            </div>
          )}
          {isFree && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              FREE
            </div>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-4 left-4">
          <div
            className={`${getLevelColor(
              level,
            )} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}
          >
            {level}
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {formatPrice(price, priceCents)}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-gold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-2">
                <BookOpen size={14} className="text-primary-purple" />
              </div>
              <span>{lessonCount || 0} lessons</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-2">
                <Clock size={14} className="text-primary-gold" />
              </div>
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-2">4.8 (1.2k reviews)</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 mb-4"></div>

        {/* Action Button */}
        <Link
          to={`/courses/${id}`}
          className="w-full bg-gradient-to-r from-primary-purple to-purple-600 text-white py-3 rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-purple-500/25"
        >
          <span>{isFree ? "Enroll Free" : "View Details"}</span>
          <Play
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
