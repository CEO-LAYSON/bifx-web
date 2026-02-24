import React, { useState, useRef, useEffect } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const CourseFilter = ({
  onFilterChange,
  onSearchChange,
  searchQuery = "",
  filters = {},
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [levelFilterOpen, setLevelFilterOpen] = useState(false);
  const [priceFilterOpen, setPriceFilterOpen] = useState(false);
  const [durationFilterOpen, setDurationFilterOpen] = useState(false);
  const levelRef = useRef(null);
  const priceRef = useRef(null);
  const durationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setLevelFilterOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setPriceFilterOpen(false);
      }
      if (durationRef.current && !durationRef.current.contains(event.target)) {
        setDurationFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const levels = [
    { value: "", label: "All Levels" },
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  const prices = [
    { value: "", label: "All Prices" },
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];

  const durations = [
    { value: "", label: "Any Duration" },
    { value: "short", label: "Short (0-2h)" },
    { value: "medium", label: "Medium (2-10h)" },
    { value: "long", label: "Long (10h+)" },
  ];

  const CustomSelect = ({
    value,
    options,
    onChange,
    isOpen,
    setIsOpen,
    label,
    colorClass,
  }) => (
    <div
      className="relative group"
      ref={
        isOpen === levelFilterOpen
          ? levelRef
          : isOpen === priceFilterOpen
          ? priceRef
          : durationRef
      }
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-left text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 appearance-none cursor-pointer transition-all duration-300 hover:bg-dark-950/70 hover:border-white/20 flex items-center justify-between"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {options.find((opt) => opt.value === value)?.label || "Select..."}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 pointer-events-none transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-dark-800 border border-white/10 rounded-xl shadow-premium-xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left transition-all duration-200 ${
                value === option.value
                  ? "bg-accent-purple/20 text-accent-purple"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-premium-xl">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent-purple/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent-gold/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-gold/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
          size={20}
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={localSearch}
          onChange={handleSearchChange}
          className="relative w-full pl-12 pr-12 py-4 bg-dark-950/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/30 transition-all duration-300 hover:bg-dark-950 hover:border-white/20"
          style={{ color: "#ffffff" }}
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch("");
              onSearchChange("");
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center text-gray-300 hover:text-white transition-all duration-300 bg-gradient-to-r from-dark-950/50 to-dark-800/50 hover:from-accent-purple/20 hover:to-accent-gold/10 px-4 py-2.5 rounded-xl border border-white/5 hover:border-accent-purple/30 group"
        >
          <Filter
            size={18}
            className="mr-2 text-accent-purple group-hover:scale-110 transition-transform duration-300"
          />
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
            className="flex items-center text-accent-gold hover:text-yellow-300 transition-all duration-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-accent-gold/10"
          >
            <X size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mr-2 animate-pulse"></div>
              Level
            </label>
            <CustomSelect
              value={filters.level || ""}
              options={levels}
              onChange={(value) => handleFilterChange("level", value)}
              isOpen={levelFilterOpen}
              setIsOpen={setLevelFilterOpen}
            />
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-accent-gold to-yellow-400 rounded-full mr-2 animate-pulse"></div>
              Price
            </label>
            <CustomSelect
              value={filters.price || ""}
              options={prices}
              onChange={(value) => handleFilterChange("price", value)}
              isOpen={priceFilterOpen}
              setIsOpen={setPriceFilterOpen}
            />
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-accent-emerald to-teal-400 rounded-full mr-2 animate-pulse"></div>
              Duration
            </label>
            <CustomSelect
              value={filters.duration || ""}
              options={durations}
              onChange={(value) => handleFilterChange("duration", value)}
              isOpen={durationFilterOpen}
              setIsOpen={setDurationFilterOpen}
            />
          </div>
        </div>
      )}

      {/* Active Filters Tags */}
      {hasActiveFilters && !isFilterOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          {localSearch && (
            <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-accent-purple/20 to-accent-cyan/10 text-accent-purple text-sm rounded-full border border-accent-purple/30 hover:border-accent-purple/50 transition-all duration-300">
              <span className="mr-1 text-xs opacity-70">Search:</span>{" "}
              {localSearch}
              <button
                onClick={() => {
                  setLocalSearch("");
                  onSearchChange("");
                }}
                className="ml-2 hover:text-white hover:bg-accent-purple/30 p-0.5 rounded-full transition-all duration-200"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.level && (
            <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-accent-emerald/20 to-teal-10 text-accent-emerald text-sm rounded-full border border-accent-emerald/30 hover:border-accent-emerald/50 transition-all duration-300">
              <span className="mr-1 text-xs opacity-70">Level:</span>{" "}
              {filters.level}
              <button
                onClick={() => handleFilterChange("level", "")}
                className="ml-2 hover:text-white hover:bg-accent-emerald/30 p-0.5 rounded-full transition-all duration-200"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.price && (
            <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-accent-gold/20 to-yellow-500/10 text-accent-gold text-sm rounded-full border border-accent-gold/30 hover:border-accent-gold/50 transition-all duration-300">
              <span className="mr-1 text-xs opacity-70">Price:</span>{" "}
              {filters.price}
              <button
                onClick={() => handleFilterChange("price", "")}
                className="ml-2 hover:text-white hover:bg-accent-gold/30 p-0.5 rounded-full transition-all duration-200"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.duration && (
            <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-blue-400 text-sm rounded-full border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
              <span className="mr-1 text-xs opacity-70">Duration:</span>{" "}
              {filters.duration}
              <button
                onClick={() => handleFilterChange("duration", "")}
                className="ml-2 hover:text-white hover:bg-blue-500/30 p-0.5 rounded-full transition-all duration-200"
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
