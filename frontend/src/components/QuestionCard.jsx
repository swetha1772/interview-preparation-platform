import React from 'react';

function QuestionCard({
  questionNumber,
  question,
  isActive = false,
  hasAnswer = false,
  onReadAgain = null,
  isHighlighted = false
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl p-8
        backdrop-blur-xl
        transition-all duration-300
        ${isActive
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20'
          : 'bg-slate-900/60 border border-slate-700/50'
        }
        ${isHighlighted ? 'ring-2 ring-cyan-400/30' : ''}
      `}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${isActive ? 'bg-gradient-to-br from-cyan-400/5 to-transparent' : 'bg-transparent'}`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Question Number & Status Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
              ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}
            `}>
              {questionNumber}
            </div>
            {hasAnswer && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                ✓ Answered
              </span>
            )}
          </div>
          {onReadAgain && (
            <button
              onClick={onReadAgain}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 px-3 py-1 rounded-lg transition-all"
            >
              Read Again
            </button>
          )}
        </div>

        {/* Question Text */}
        <p className={`
          text-lg leading-relaxed
          ${isActive ? 'text-white' : 'text-slate-300'}
          transition-colors
        `}>
          {question}
        </p>
      </div>
    </div>
  );
}

export default QuestionCard;
