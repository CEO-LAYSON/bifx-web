import { useState, useMemo, useCallback } from "react";

export const useSearch = (
  items = [],
  searchFields = ["title", "description"]
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter items based on search query and filters
  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => item[field]?.toLowerCase().includes(query))
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) => {
          if (key === "price") {
            if (value === "free") return item.isFree;
            if (value === "paid") return !item.isFree;
          }
          if (key === "level" && value !== "ALL") return item.level === value;
          if (key === "duration") {
            const duration = item.totalDuration || 0;
            switch (value) {
              case "short":
                return duration <= 120;
              case "medium":
                return duration > 120 && duration <= 600;
              case "long":
                return duration > 600;
              default:
                return true;
            }
          }
          return true;
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result = [...result].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle different data types
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, searchQuery, filters, sortBy, sortOrder, searchFields]);

  // Clear all filters and search
  const clearAll = useCallback(() => {
    setSearchQuery("");
    setFilters({});
    setSortBy("");
    setSortOrder("asc");
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return searchQuery || Object.keys(filters).length > 0 || sortBy;
  }, [searchQuery, filters, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredItems,
    clearAll,
    hasActiveFilters,
  };
};
