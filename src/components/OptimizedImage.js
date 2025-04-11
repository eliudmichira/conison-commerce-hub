import React, { useState, useEffect } from 'react';

/**
 * OptimizedImage - A component for optimized image loading with lazy loading and blur-up effect
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.priority - Whether this is a priority image (above the fold)
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  width,
  height,
  ...rest 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // If this is a priority image, load it immediately
    if (priority) {
      setIsInView(true);
      return;
    }
    
    // Otherwise use IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is 200px from viewport
    );
    
    // Create a reference to the current img element
    const imgElement = document.getElementById(`image-${src.replace(/[^\w]/g, '-')}`);
    
    if (imgElement) {
      observer.observe(imgElement);
    }
    
    return () => {
      if (imgElement) {
        observer.unobserve(imgElement);
      }
      observer.disconnect();
    };
  }, [src, priority]);
  
  // Generate a tiny placeholder for the blur-up effect (could be extended with actual tiny placeholders)
  const placeholderStyle = {
    backgroundColor: '#f3f4f6', // Light gray background as placeholder
    filter: isLoaded ? 'none' : 'blur(8px)',
    transition: 'filter 0.5s ease-in-out',
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        id={`image-${src.replace(/[^\w]/g, '-')}`}
        src={isInView || priority ? src : ''}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        {...rest}
      />
      <div 
        className="absolute inset-0 bg-gray-200"
        style={{
          ...placeholderStyle,
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  );
};

export default OptimizedImage; 