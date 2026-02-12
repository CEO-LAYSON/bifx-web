import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ item, isActive, onClose }) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.name}
      to={item.href}
      onClick={onClose}
      className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
        isActive
          ? "text-white"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {/* Left active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-current rounded-r-full shadow-lg" />
      )}

      {/* Icon */}
      <div
        className={`relative z-10 mr-3 transition-all duration-300 ${
          isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
        }`}
      >
        <Icon size={20} />
      </div>

      {/* Label */}
      <span className="relative z-10">{item.name}</span>

      {/* Right active indicator arrow */}
      {isActive && (
        <svg
          className="absolute right-3 w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </Link>
  );
};

export default NavItem;
