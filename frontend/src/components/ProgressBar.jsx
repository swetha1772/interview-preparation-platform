import React from 'react';

function ProgressBar({ current = 0, total = 100, showText = true, animated = true }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Progress track */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        {/* Progress fill */}
        <div
          className={`h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-500 ${
            animated ? 'ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Text label */}
      {showText && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium text-slate-400">
            Progress
          </span>
          <span className="text-xs font-bold text-cyan-400">
            {current} / {total}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
