/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4338ca',
        'primary-purple': '#8b5cf6',
        'primary-teal': '#06b6d4',
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'text-tertiary': '#6b7280',
        'light': '#ffffff',
        'off-white': '#f9fafb',
        'light-accent': '#f3f4f6',
        'dark-primary': '#111827',
        'dark-secondary': '#1f2937',
        'dark-accent': '#374151',
        'dark-text-primary': '#f9fafb',
        'dark-text-secondary': '#e5e7eb',
        'conison-yellow': '#06b6d4',
        'conison-cyan': '#4338ca',
        'conison-magenta': '#8b5cf6',
        'conison-gray': '#374151',
        'background': '#ffffff',
        'foreground': '#111827',
        'border': '#e5e7eb',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 6px -1px rgba(67, 56, 202, 0.2)',
        'button-hover': '0 10px 15px -3px rgba(67, 56, 202, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'full': '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 