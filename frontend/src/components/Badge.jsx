import React from 'react';
import { X } from 'lucide-react';

function Badge({
  text,
  variant = 'default',
  size = 'md',
  onRemove = null,
  icon: Icon = null
}) {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    primary: 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30',
    success: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30',
    warning: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
    error: 'bg-red-400/20 text-red-300 border border-red-400/30',
    gradient: 'bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-300 border border-cyan-400/30'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={`
      inline-flex items-center gap-2 rounded-full font-medium
      transition-all duration-200
      hover:shadow-lg hover:shadow-current/20
      ${variants[variant]}
      ${sizes[size]}
    `}>
      {Icon && <Icon size={14} />}
      <span>{text}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default Badge;
