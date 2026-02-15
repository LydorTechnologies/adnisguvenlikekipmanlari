/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#E4B33C',
          light: '#F0CC6A',
          dark: '#C99A2E',
          50: '#FDF8EB',
          100: '#FAF0D1',
          200: '#F3DDA3',
          500: '#E4B33C',
          600: '#C99A2E',
          700: '#A67D24',
          800: '#83621C',
          900: '#604814',
        },
        dark: {
          DEFAULT: '#161616',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2A2A2A',
          800: '#1E1E1E',
          900: '#161616',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
