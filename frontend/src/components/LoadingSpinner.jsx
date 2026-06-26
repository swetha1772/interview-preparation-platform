import React from 'react';

function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerSizes = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`flex flex-col items-center gap-3 ${containerSizes[size]}`}>
        <div className={`${sizeClasses[size]} border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin`}></div>
        {text && <p className="text-slate-400 text-sm font-medium">{text}</p>}
      </div>
    </div>
  );
}

export default LoadingSpinner;
