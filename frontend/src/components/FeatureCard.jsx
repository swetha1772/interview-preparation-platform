import React from 'react';

function FeatureCard({
  icon: Icon,
  title,
  description,
  onClick,
  className = '',
  highlighted = false,
  badge = null
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-slate-900 to-slate-800/50
        border border-slate-700 hover:border-cyan-400/50
        rounded-2xl p-8
        cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:shadow-cyan-500/20
        hover:scale-[1.02]
        group
        ${highlighted ? 'ring-2 ring-cyan-400/30' : ''}
        ${className}
      `}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-cyan-400/10 transition-all duration-300" />

      <div className="relative z-10">
        {/* Badge */}
        {badge && (
          <div className="inline-block mb-4">
            <span className="px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs font-semibold rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 flex items-center justify-center mb-4 group-hover:from-cyan-400/30 group-hover:to-cyan-400/10 transition-all duration-300">
          {Icon && <Icon size={24} className="text-cyan-400" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
