// components/PricingSlider.js
import React, { useState, useEffect } from 'react';

const PricingSlider = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value || [min, max]);
  
  // Update local state when props change
  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate percentage for positioning
  const calculateLeftThumbPosition = () => {
    return ((localValue[0] - min) / (max - min)) * 100;
  };
  
  const calculateRightThumbPosition = () => {
    return ((localValue[1] - min) / (max - min)) * 100;
  };
  
  // Handle changes
  const handleLeftThumbChange = (e) => {
    const newValue = Math.min(parseInt(e.target.value), localValue[1] - 50);
    setLocalValue([newValue, localValue[1]]);
    onChange && onChange([newValue, localValue[1]]);
  };
  
  const handleRightThumbChange = (e) => {
    const newValue = Math.max(parseInt(e.target.value), localValue[0] + 50);
    setLocalValue([localValue[0], newValue]);
    onChange && onChange([localValue[0], newValue]);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between">
        <span className="text-lg font-medium dark:text-white">
          Min: ${formatNumber(localValue[0])}
        </span>
        <span className="text-lg font-medium dark:text-white">
          Max: ${formatNumber(localValue[1])}
        </span>
      </div>
      
      <div className="relative h-2 rounded-md bg-gray-200 dark:bg-gray-700 mb-8">
        {/* Track highlight */}
        <div 
          className="absolute h-full bg-conison-magenta rounded-md"
          style={{
            left: `${calculateLeftThumbPosition()}%`,
            width: `${calculateRightThumbPosition() - calculateLeftThumbPosition()}%`
          }}
        />
        
        {/* Left thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleLeftThumbChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: 3 }}
        />
        
        {/* Right thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleRightThumbChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: 4 }}
        />
        
        {/* Custom thumb displays */}
        <div 
          className="absolute w-6 h-6 rounded-full bg-white border-2 border-conison-magenta shadow-md flex items-center justify-center cursor-pointer"
          style={{ 
            left: `calc(${calculateLeftThumbPosition()}% - 12px)`, 
            top: "-8px",
            zIndex: 5
          }}
        >
          <div className="w-2 h-2 rounded-full bg-conison-magenta" />
        </div>
        
        <div 
          className="absolute w-6 h-6 rounded-full bg-white border-2 border-conison-magenta shadow-md flex items-center justify-center cursor-pointer"
          style={{ 
            left: `calc(${calculateRightThumbPosition()}% - 12px)`, 
            top: "-8px",
            zIndex: 6
          }}
        >
          <div className="w-2 h-2 rounded-full bg-conison-magenta" />
        </div>
      </div>
      
      {/* Price markers */}
      <div className="flex justify-between px-1 mt-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(min)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(Math.floor((max + min) / 2))}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(max)}</span>
      </div>
    </div>
  );
};

export default PricingSlider;