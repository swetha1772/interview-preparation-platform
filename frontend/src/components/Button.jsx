import React from 'react';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick = null,
  icon: Icon = null,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-400/50',
    secondary: 'bg-slate-800 text-white border border-slate-700 hover:border-slate-600',
    success: 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:shadow-lg hover:shadow-emerald-400/50',
    danger: 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:shadow-lg hover:shadow-red-400/50',
    outline: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
