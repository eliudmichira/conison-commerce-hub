import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  variant = 'circle', 
  thickness = 'medium',
  fullPage = false,
  text = '',
  className = ''
}) => {
  // Size mapping
  const sizeMap = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };
  
  // Color mapping - uses tailwind classes
  const colorMap = {
    primary: 'border-conison-magenta',
    white: 'border-white',
    gray: 'border-gray-400',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-400',
    purple: 'border-purple-500'
  };
  
  // Text color mapping
  const textColorMap = {
    primary: 'text-conison-magenta',
    white: 'text-white',
    gray: 'text-gray-400',
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-400',
    purple: 'text-purple-500'
  };
  
  // Border thickness mapping
  const thicknessMap = {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4'
  };
  
  // Apply the correct classes based on props
  const spinnerSize = sizeMap[size] || sizeMap.md;
  const spinnerColor = colorMap[color] || colorMap.primary;
  const spinnerThickness = thicknessMap[thickness] || thicknessMap.medium;
  const textColor = textColorMap[color] || textColorMap.primary;
  
  // Component container classes
  const containerClasses = fullPage 
    ? 'fixed inset-0 flex justify-center items-center bg-gray-900/30 backdrop-blur-sm z-50' 
    : 'flex flex-col justify-center items-center';
  
  // Spinner variant rendering
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`flex space-x-2 ${className}`}>
            <div className={`${spinnerColor} h-3 w-3 rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
            <div className={`${spinnerColor} h-3 w-3 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`${spinnerColor} h-3 w-3 rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
          </div>
        );
        
      case 'pulse':
        return (
          <div className={`${spinnerSize} ${className}`}>
            <div className={`${spinnerColor} h-full w-full rounded-full animate-ping opacity-75`}></div>
          </div>
        );
        
      case 'bars':
        return (
          <div className={`flex items-center space-x-1 ${className}`}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className={`w-2 bg-current ${textColor} animate-pulse`} 
                style={{ 
                  height: `${(index + 1) * 4 + 8}px`,
                  animationDelay: `${index * 0.15}s` 
                }}
              ></div>
            ))}
          </div>
        );
        
      case 'ring':
        return (
          <div className={`${spinnerSize} ${className} relative`}>
            <div className={`${spinnerThickness} ${spinnerColor} rounded-full h-full w-full border-b-transparent border-r-transparent animate-spin`}></div>
            <div className={`absolute inset-0 ${spinnerThickness} ${spinnerColor} rounded-full opacity-20`}></div>
          </div>
        );
        
      case 'circle':
      default:
        return (
          <div className={`${spinnerSize} ${spinnerThickness} ${spinnerColor} rounded-full animate-spin border-t-transparent border-l-transparent ${className}`}></div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      {renderSpinner()}
      {text && (
        <span className={`mt-3 text-sm font-medium ${textColor}`}>
          {text}
        </span>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'white', 'gray', 'blue', 'green', 'red', 'yellow', 'purple']),
  variant: PropTypes.oneOf(['circle', 'dots', 'pulse', 'bars', 'ring']),
  thickness: PropTypes.oneOf(['thin', 'medium', 'thick']),
  fullPage: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string
};

export default LoadingSpinner;