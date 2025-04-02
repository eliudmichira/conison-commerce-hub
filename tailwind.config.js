/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        conison: {
          50: 'var(--conison-50)',
          100: 'var(--conison-100)',
          200: 'var(--conison-200)',
          300: 'var(--conison-300)',
          400: 'var(--conison-400)',
          500: 'var(--conison-500)',
          600: 'var(--conison-600)',
          700: 'var(--conison-700)',
          800: 'var(--conison-800)',
          900: 'var(--conison-900)',
          950: 'var(--conison-950)',
        },
      },
    },
  },
  plugins: [],
} 