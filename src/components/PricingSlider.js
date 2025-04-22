// components/PricingSlider.js
import React, { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const PricingSlider = ({ min, max, value, onChange }) => {
  const { isDarkMode } = useDarkMode();
  const [localValue, setLocalValue] = useState(value || [min, max]);
  const sliderRef = useRef(null);
  
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
  
  // Handle min input change
  const handleMinChange = (e) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, '')) || min;
    const validatedMin = Math.max(min, Math.min(newValue, localValue[1] - 1));
    const newValues = [validatedMin, localValue[1]];
    setLocalValue(newValues);
    onChange && onChange(newValues);
  };
  
  // Handle max input change
  const handleMaxChange = (e) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, '')) || max;
    const validatedMax = Math.min(max, Math.max(newValue, localValue[0] + 1));
    const newValues = [localValue[0], validatedMax];
    setLocalValue(newValues);
    onChange && onChange(newValues);
  };

  // Calculate percentages for the slider
  const minPos = ((localValue[0] - min) / (max - min)) * 100;
  const maxPos = ((localValue[1] - min) / (max - min)) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2 dark:text-white">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={localValue[0]}
            onChange={handleMinChange}
            className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-lg font-medium dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Minimum budget"
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2 dark:text-white">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={localValue[1]}
            onChange={handleMaxChange}
            className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-lg font-medium dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Maximum budget"
          />
        </div>
      </div>
      
      <div className="relative h-2 my-8">
        {/* Track background */}
        <div className="absolute w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        
        {/* Filled track */}
        <div 
          className="absolute h-full rounded-full"
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`,
            background: isDarkMode 
              ? 'linear-gradient(to right, #9333ea, #6366f1)' 
              : 'linear-gradient(to right, #8b5cf6, #6366f1)'
          }}
        ></div>
        
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={(e) => {
            const newMin = parseInt(e.target.value);
            if (newMin < localValue[1]) {
              setLocalValue([newMin, localValue[1]]);
              onChange && onChange([newMin, localValue[1]]);
            }
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none focus:outline-none"
          style={{
            pointerEvents: 'auto',
            // This ensures only the thumb is clickable
            '--range-shdw': isDarkMode 
              ? '0 0 0 15px rgba(147, 51, 234, 0.2)' 
              : '0 0 0 15px rgba(139, 92, 246, 0.15)'
          }}
        />
        
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={(e) => {
            const newMax = parseInt(e.target.value);
            if (newMax > localValue[0]) {
              setLocalValue([localValue[0], newMax]);
              onChange && onChange([localValue[0], newMax]);
            }
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none focus:outline-none"
          style={{
            pointerEvents: 'auto',
            // This ensures only the thumb is clickable
            '--range-shdw': isDarkMode 
              ? '0 0 0 15px rgba(147, 51, 234, 0.2)' 
              : '0 0 0 15px rgba(139, 92, 246, 0.15)'
          }}
        />
      </div>
      
      {/* Price markers */}
      <div className="flex justify-between px-1 mt-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(min)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(Math.floor((max + min) / 2))}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(max)}</span>
      </div>
      
      {/* Add CSS for range inputs */}
      <style jsx="true" global="true">{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 2px;
          background: transparent;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #8b5cf6;
          box-shadow: var(--range-shdw);
          cursor: pointer;
          transition: background .15s ease-in-out;
        }
        
        input[type="range"]:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #8b5cf6;
          box-shadow: var(--range-shdw);
          cursor: pointer;
          transition: background .15s ease-in-out;
        }
        
        input[type="range"]:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
        }
        
        .dark input[type="range"]::-webkit-slider-thumb {
          border-color: #9333ea;
        }
        
        .dark input[type="range"]::-moz-range-thumb {
          border-color: #9333ea;
        }
      `}</style>
    </div>
  );
};

export default PricingSlider;