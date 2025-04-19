/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        space: {
          dark: '#0B061F',
          card: '#1A123F',
          purple: '#7C3AED',
          'purple-light': '#8B5CF6',
          gray: '#6B7280',
        },
        light: {
          bg: '#f4f4f5',
          surface: '#fafafa',
          text: '#111827',
          'text-secondary': '#4B5563',
        }
      },
      animation: {
        'progress': 'progress linear forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        glow: {
          'from': { 'box-shadow': '0 0 10px #7C3AED, 0 0 20px #7C3AED, 0 0 30px #7C3AED' },
          'to': { 'box-shadow': '0 0 20px #7C3AED, 0 0 30px #7C3AED, 0 0 40px #7C3AED' }
        }
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at center, #1A123F 0%, #0B061F 100%)',
        'stars': 'url("/stars.png")'
      }
    },
  },
  plugins: [],
} 