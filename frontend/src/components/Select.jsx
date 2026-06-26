import React from 'react';
import { ChevronDown } from 'lucide-react';

function Select({
  options = [],
  value = '',
  onChange = null,
  placeholder = 'Select an option',
  label = '',
  error = '',
  disabled = false,
  fullWidth = true,
  ...props
}) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10
            bg-slate-900 border rounded-lg
            text-white appearance-none
            transition-all duration-200
            cursor-pointer
            ${error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
              : 'border-slate-700 hover:border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            outline-none
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
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

export default Select;
