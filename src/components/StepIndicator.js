// components/StepIndicator.js
import React from 'react';

const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Calculate if step is active, completed, or upcoming
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = isCompleted && onStepClick;
          
          // Determine status classes
          const circleClasses = isActive
            ? "bg-white border-4 border-conison-magenta text-conison-magenta"
            : isCompleted
              ? "bg-conison-magenta text-white"
              : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400";
          
          const lineClasses = isCompleted
            ? "bg-conison-magenta"
            : "bg-gray-200 dark:bg-gray-700";
            
          const textClasses = isActive || isCompleted
            ? "text-white font-medium"
            : "text-gray-400 dark:text-gray-500";
            
          return (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(stepNumber)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${circleClasses} text-lg mb-2 transition-all duration-300 ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                  disabled={!isClickable}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </button>
                
                {/* Step Title */}
                <div className={`text-center ${textClasses}`}>
                  <p className="text-sm sm:text-base">{step.title}</p>
                  <p className="hidden md:block text-xs max-w-[120px] mt-1 text-gray-400 dark:text-gray-500">{step.description}</p>
                </div>
              </div>
              
              {/* Connector Line (except after last step) */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 ${lineClasses} mx-4 transition-all duration-500`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;