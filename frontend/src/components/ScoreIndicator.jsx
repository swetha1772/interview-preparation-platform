import React from 'react';

function ScoreIndicator({
  score = 0,
  maxScore = 100,
  label = 'Score',
  size = 'md',
  showPercentage = true,
  compact = false
}) {
  const percentage = (score / maxScore) * 100;

  // Determine color based on score
  const getColor = () => {
    if (percentage >= 80) return { bg: 'from-emerald-400/20 to-emerald-400/5', ring: 'ring-emerald-400/30', text: 'text-emerald-400', bar: 'from-emerald-400 to-emerald-500' };
    if (percentage >= 60) return { bg: 'from-cyan-400/20 to-cyan-400/5', ring: 'ring-cyan-400/30', text: 'text-cyan-400', bar: 'from-cyan-400 to-cyan-500' };
    if (percentage >= 40) return { bg: 'from-yellow-400/20 to-yellow-400/5', ring: 'ring-yellow-400/30', text: 'text-yellow-400', bar: 'from-yellow-400 to-yellow-500' };
    return { bg: 'from-red-400/20 to-red-400/5', ring: 'ring-red-400/30', text: 'text-red-400', bar: 'from-red-400 to-red-500' };
  };

  const colors = getColor();
  const sizeClasses = {
    sm: { circle: 'w-12 h-12', text: 'text-sm', ring: 'ring-1', textSize: 'text-lg' },
    md: { circle: 'w-20 h-20', text: 'text-base', ring: 'ring-2', textSize: 'text-2xl' },
    lg: { circle: 'w-32 h-32', text: 'text-lg', ring: 'ring-2', textSize: 'text-4xl' }
  };

  const size_config = sizeClasses[size];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`${size_config.circle} rounded-lg ${colors.bg} border border-slate-700/50 flex items-center justify-center flex-shrink-0`}>
          <div className="text-center">
            <div className={`${size_config.textSize} font-bold ${colors.text}`}>
              {Math.round(score)}
            </div>
            {showPercentage && <div className="text-xs text-slate-400">/{maxScore}</div>}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700/50">
            <div
              className={`h-full bg-gradient-to-r ${colors.bar} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${size_config.circle} rounded-full flex items-center justify-center bg-gradient-to-br ${colors.bg} border border-slate-700/50 ring ${colors.ring}`}>
        {/* Circular progress background */}
        <div className="absolute inset-0 rounded-full bg-slate-900/50" />

        {/* Circular progress border */}
        <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-700/30"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={colors.bar.split(' ')[1]} />
              <stop offset="100%" className={colors.bar.split(' ')[2]} />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="text-center z-10">
          <div className={`${size_config.textSize} font-bold ${colors.text}`}>
            {Math.round(score)}
          </div>
          {showPercentage && <div className={`${size_config.text} text-slate-400`}>{Math.round(percentage)}%</div>}
        </div>
      </div>
      <p className={`${size_config.text} font-medium text-slate-300 mt-3`}>
        {label}
      </p>
    </div>
  );
}

export default ScoreIndicator;
