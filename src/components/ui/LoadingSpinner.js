import React from 'react';

const LoadingSpinner = ({ size = 'medium', centered = true }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-3',
    large: 'h-16 w-16 border-4'
  };

  const spinnerClasses = `
    animate-spin rounded-full 
    ${sizeClasses[size] || sizeClasses.medium} 
    border-t-transparent border-conison-magenta
  `;

  if (centered) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] w-full">
        <div className={spinnerClasses}></div>
      </div>
    );
  }

  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner; 