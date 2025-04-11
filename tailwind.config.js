/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  safelist: [
    // Ensure these classes are always included in the production build
    'text-primary-blue', 'text-primary-purple', 'text-primary-teal',
    'bg-primary-blue', 'bg-primary-purple', 'bg-primary-teal',
    'dark:text-dark-text-primary', 'dark:text-dark-text-secondary', 'dark:text-dark-text-tertiary',
    'dark:bg-dark-primary', 'dark:bg-dark-secondary', 'dark:bg-dark-accent',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - updated for better contrast
        'primary-blue': '#1d4ed8',
        'primary-purple': '#7c3aed',
        'primary-teal': '#0f766e',
        
        // Text colors with better contrast
        'text-primary': '#111827',
        'text-secondary': '#1f2937',
        'text-tertiary': '#4b5563',
        
        // Light mode backgrounds
        'light': '#ffffff',
        'off-white': '#f9fafb',
        'light-accent': '#f3f4f6',
        
        // Dark mode colors with improved contrast
        'dark-primary': '#121826',
        'dark-secondary': '#1e293b',
        'dark-accent': '#334155',
        'dark-text-primary': '#f1f5f9',
        'dark-text-secondary': '#cbd5e1',
        'dark-text-tertiary': '#94a3b8',
        
        // Legacy brand colors - updated for accessibility
        'conison-yellow': '#eab308',
        'conison-cyan': '#0e7490',
        'conison-magenta': '#be185d',
        'conison-gray': '#1f2937',
        
        // System colors
        'background': '#ffffff',
        'foreground': '#111827',
        'border': '#e5e7eb',
        
        // Status colors with better contrast
        'success': '#16a34a',
        'error': '#dc2626',
        'warning': '#ca8a04',
        'info': '#0284c7',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 6px -1px rgba(29, 78, 216, 0.2)',
        'button-hover': '0 10px 15px -3px rgba(29, 78, 216, 0.3)',
        'dark-card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      fontSize: {
        'xs': '0.875rem',    // 14px
        'sm': '1rem',        // 16px
        'base': '1.125rem',  // 18px
        'lg': '1.25rem',     // 20px
        'xl': '1.5rem',      // 24px
        '2xl': '1.875rem',   // 30px
        '3xl': '2.25rem',    // 36px
        '4xl': '3rem',       // 48px
        '5xl': '3.75rem',    // 60px
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
} 