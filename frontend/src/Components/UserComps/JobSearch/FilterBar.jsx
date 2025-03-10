import React, { useState, useEffect, useRef } from "react";

const FilterBar = ({ onFiltersChange }) => {
  // State for managing active dropdowns and selected filters
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    title: null,
    company: null,
    skills: null
  });
  
  // Refs for detecting clicks outside dropdowns
  const dropdownRef = useRef(null);

  // Mock filter options
  const filterOptions = {
    title: ["Front-end Developer", "Backend Engineer", "UI/UX Designer", "Full Stack Developer", "DevOps Engineer", "Mobile App Developer"],
    company: ["TechCorp", "DataSystems", "CreativeMinds", "WebSolutions", "CloudTech", "AppWorks"],
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "MongoDB", "Express", "AWS", "Figma", "Docker", "React Native", "Flutter", "Firebase"]
  };

  // Update parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Toggle dropdown visibility
  const handleFilterClick = (filter) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  // Handle option selection
  const handleOptionSelect = (filterType, option) => {
    setFilters({
      ...filters,
      [filterType]: option
    });
    setOpenDropdown(null);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      title: null,
      company: null,
      skills: null
    });
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value !== null);

  return (
    <div className="bg-base-200 rounded-xl p-4 border border-base-300 shadow">
      <div className="flex justify-between border-b border-base-300 pb-4">
        {/* Title Filter */}
        <button
          className={`flex-1 px-4 py-2 rounded-lg text-base font-medium cursor-pointer ${openDropdown === "title" ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
          onClick={() => handleFilterClick("title")}
        >
          Title {filters.title && `(${filters.title})`}
        </button>
        
        <div className="border-r border-base-300 mx-2"></div>
        
        {/* Company Filter */}
        <button
          className={`flex-1 px-4 py-2 rounded-lg text-base font-medium cursor-pointer ${openDropdown === "company" ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
          onClick={() => handleFilterClick("company")}
        >
          Company {filters.company && `(${filters.company})`}
        </button>
        
        <div className="border-r border-base-300 mx-2"></div>
        
        {/* Skills Filter */}
        <button
          className={`flex-1 px-4 py-2 rounded-lg text-base font-medium cursor-pointer ${openDropdown === "skills" ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
          onClick={() => handleFilterClick("skills")}
        >
          Skills {filters.skills && `(${filters.skills})`}
        </button>
      </div>
      
      {/* Dropdown for the active filter */}
      {openDropdown && (
        <div 
          ref={dropdownRef} 
          className="mt-3 bg-base-300 rounded-xl shadow p-3 max-h-60 overflow-y-auto z-10"
        >
          <ul className="menu w-full">
            {filterOptions[openDropdown].map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(openDropdown, option)}
                  className="hover:bg-base-100 p-2 rounded-lg cursor-pointer"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Clear All Filters button */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-start">
          <button 
            className="btn btn-sm btn-ghost rounded-lg cursor-pointer" 
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;