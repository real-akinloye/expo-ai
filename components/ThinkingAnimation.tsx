import React from 'react';

const ThinkingAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex space-x-2 justify-center items-center ${className || ''}`}>
      <div className="h-4 w-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
      <div className="h-4 w-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
      <div className="h-4 w-4 bg-cyan-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default ThinkingAnimation;
