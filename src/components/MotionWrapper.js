// components/MotionWrapper.js
import React, { useState, useEffect, useRef } from 'react';

/**
 * A simple animation wrapper component that adds fade-in and slide-up animations
 * to its children when they enter the viewport.
 */
const MotionWrapper = ({ children, delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element enters the viewport
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000); // Convert delay to milliseconds
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);
  
  return (
    <div
      ref={elementRef}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {children}
    </div>
  );
};

export default MotionWrapper;