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
    return `${price || priceCents / 100}`;
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
        return "bg-gradient-to-r from-emerald-500 to-teal-600";
      case "INTERMEDIATE":
        return "bg-gradient-to-r from-accent-gold to-yellow-500";
      case "ADVANCED":
        return "bg-gradient-to-r from-rose-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-accent-purple/50 transition-all duration-500 hover:shadow-premium-xl hover:shadow-accent-purple/20 hover:-translate-y-2">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/0 via-accent-purple/5 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnailUrl || "/placeholder-course.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 bg-dark-950/50 backdrop-blur-sm"></div>
          <div className="relative w-16 h-16 bg-gradient-to-r from-accent-purple to-purple-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-premium-glow">
            <Play size={28} className="text-white ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!isFree && (
            <div className="bg-gradient-to-r from-accent-gold to-yellow-400 text-dark-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-accent-gold/30 animate-pulse">
              PREMIUM
            </div>
          )}
          {isFree && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/30">
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
          <div className="bg-dark-950/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/10">
            {formatPrice(price, priceCents)}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="relative p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent-gold transition-all duration-300 group-hover:translate-x-1">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-dark-950 to-dark-800 rounded-lg flex items-center justify-center mr-2 border border-white/5">
                <BookOpen size={14} className="text-accent-purple" />
              </div>
              <span>{lessonCount || 0} lessons</span>
            </div>
            <div className="flex items-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-dark-950 to-dark-800 rounded-lg flex items-center justify-center mr-2 border border-white/5">
                <Clock size={14} className="text-accent-gold" />
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
          <span className="text-gray-400 text-sm ml-2 group-hover:text-white transition-colors duration-300">
            4.8 (1.2k reviews)
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-4"></div>

        {/* Action Button */}
        <Link
          to={`/courses/${id}`}
          className="w-full bg-gradient-to-r from-accent-purple via-purple-600 to-purple-700 text-white py-3.5 rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-premium-glow group-hover:shadow-accent-purple/30 relative overflow-hidden"
        >
          <span className="relative z-10">
            {isFree ? "Enroll Free" : "View Details"}
          </span>
          <Play
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1 relative z-10"
          />
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
