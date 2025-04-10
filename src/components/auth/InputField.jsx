import React from 'react';

export const InputField = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-conison-magenta focus:border-conison-magenta bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={placeholder}
          required={required}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default InputField; 