import React from 'react';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

const InputField = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  value, 
  onChange, 
  icon: Icon, 
  error,
  showPassword,
  onTogglePassword
}) => {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          className={`
            appearance-none 
            block 
            w-full 
            px-4 
            py-3 
            ${Icon ? 'pl-10' : ''} 
            ${type === 'password' ? 'pr-10' : ''}
            border 
            rounded-lg 
            shadow-sm 
            focus:ring-2 
            focus:ring-conison-magenta 
            focus:border-conison-magenta
            dark:bg-gray-700 
            dark:text-white
            ${error 
              ? 'border-red-500 text-red-900' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

export default InputField; 