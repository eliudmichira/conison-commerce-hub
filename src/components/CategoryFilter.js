// components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onChange, isDarkMode }) => {
  return (
    <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === category.id
              ? isDarkMode
                ? 'bg-red-600 text-white'
                : 'bg-red-600 text-white'
              : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 dark:hover:bg-gray-600`
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;