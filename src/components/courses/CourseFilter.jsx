import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={localSearch}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <Filter size={20} className="mr-2" />
          Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
          >
            <X size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Level
            </label>
            <select
              value={filters.level || ""}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option value="">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <select
              value={filters.price || ""}
              onChange={(e) => handleFilterChange("price", e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duration
            </label>
            <select
              value={filters.duration || ""}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option value="">Any Duration</option>
              <option value="short">Short (0-2h)</option>
              <option value="medium">Medium (2-10h)</option>
              <option value="long">Long (10h+)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFilter;
