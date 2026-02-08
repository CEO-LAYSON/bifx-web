import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const CourseFilter = ({
  onFilterChange,
  onSearchChange,
  searchQuery = "",
  filters = {},
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    setLocalSearch("");
    onSearchChange("");
    onFilterChange({});
  };

  const hasActiveFilters = localSearch || Object.keys(filters).length > 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={localSearch}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all duration-300"
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch("");
              onSearchChange("");
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center text-gray-300 hover:text-white transition-colors bg-gray-700/50 px-4 py-2 rounded-lg"
        >
          <Filter size={18} className="mr-2" />
          <span className="font-medium">Filters</span>
          <ChevronDown
            size={16}
            className={`ml-2 transition-transform duration-300 ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-primary-gold hover:text-yellow-300 transition-colors text-sm font-medium"
          >
            <X size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-primary-purple rounded-full mr-2"></div>
              Level
            </label>
            <div className="relative">
              <select
                value={filters.level || ""}
                onChange={(e) => handleFilterChange("level", e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">All Levels</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-primary-gold rounded-full mr-2"></div>
              Price
            </label>
            <div className="relative">
              <select
                value={filters.price || ""}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Duration
            </label>
            <div className="relative">
              <select
                value={filters.duration || ""}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">Any Duration</option>
                <option value="short">Short (0-2h)</option>
                <option value="medium">Medium (2-10h)</option>
                <option value="long">Long (10h+)</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Tags */}
      {hasActiveFilters && !isFilterOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          {localSearch && (
            <span className="inline-flex items-center px-3 py-1 bg-primary-purple/20 text-primary-purple text-sm rounded-full border border-primary-purple/30">
              Search: {localSearch}
              <button
                onClick={() => {
                  setLocalSearch("");
                  onSearchChange("");
                }}
                className="ml-2 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.level && (
            <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
              Level: {filters.level}
              <button
                onClick={() => handleFilterChange("level", "")}
                className="ml-2 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.price && (
            <span className="inline-flex items-center px-3 py-1 bg-primary-gold/20 text-primary-gold text-sm rounded-full border border-primary-gold/30">
              Price: {filters.price}
              <button
                onClick={() => handleFilterChange("price", "")}
                className="ml-2 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.duration && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
              Duration: {filters.duration}
              <button
                onClick={() => handleFilterChange("duration", "")}
                className="ml-2 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseFilter;
