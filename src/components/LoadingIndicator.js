import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-cyan"></div>
    </div>
  );
};

export default LoadingIndicator; 