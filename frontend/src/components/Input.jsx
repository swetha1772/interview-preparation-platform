import React from 'react';

function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange = null,
  disabled = false,
  error = '',
  label = '',
  icon: Icon = null,
  fullWidth = true,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3
            ${Icon ? 'pl-10' : ''}
            bg-slate-900 border rounded-lg
            text-white placeholder-slate-500
            transition-all duration-200
            ${error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
              : 'border-slate-700 hover:border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            outline-none
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
