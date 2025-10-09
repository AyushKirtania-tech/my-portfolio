/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const darkMode = 'class';
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
    },
    keyframes: {
      slowPulse: {
        '0%,100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.02)' },
      },
    },
    animation: {
      'slow-pulse': 'slowPulse 6s ease-in-out infinite',
    },
    colors: {
      brand: {
        50: '#f5f3ff',
        500: '#7c3aed',
        600: '#6d28d9',
      },
    },
  },
};
export const plugins = [];
