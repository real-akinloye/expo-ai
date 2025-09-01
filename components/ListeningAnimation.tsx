import React from 'react';

const ListeningAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex space-x-1.5 justify-center items-end h-8 ${className || ''}`}>
      <span className="w-1.5 h-2 bg-cyan-400 rounded-full animate-wave" style={{ animationDelay: '-0.5s' }}></span>
      <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-wave" style={{ animationDelay: '-0.3s' }}></span>
      <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-wave" style={{ animationDelay: '-0.1s' }}></span>
      <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-wave" style={{ animationDelay: '-0.3s' }}></span>
      <span className="w-1.5 h-2 bg-cyan-400 rounded-full animate-wave" style={{ animationDelay: '-0.5s' }}></span>
    </div>
  );
};

export default ListeningAnimation;
