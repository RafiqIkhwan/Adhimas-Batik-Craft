/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6EF',
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F2EADB',
          300: '#E8DCC6',
        },
        beige: {
          DEFAULT: '#E8DCC6',
          light: '#F0E8D8',
          dark: '#D4C4A8',
        },
        maroon: {
          DEFAULT: '#6B2B27',
          light: '#8B3A35',
          dark: '#4D1C19',
        },
        brick: {
          DEFAULT: '#A0453E',
          light: '#C25D54',
          dark: '#7A3530',
        },
        cocoa: {
          DEFAULT: '#3D2817',
          light: '#5C3D26',
          dark: '#2A1B0E',
        },
        gold: {
          DEFAULT: '#B8923F',
          light: '#D4AF5E',
          dark: '#9A7832',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide-sm': '0.08em',
        'widest-sm': '0.12em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
