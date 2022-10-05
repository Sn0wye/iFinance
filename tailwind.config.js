/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'shake-reverse': 'shake 0.3s ease-in-out'
      },
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(18deg)'
          }
        },
        'shake-reverse': {
          '0%, 100%': {
            transform: 'rotate(-12deg)'
          },
          '50%': {
            transform: 'rotate(0deg)'
          }
        }
      },
      fontFamily: {
        overpass: ['Overpass', 'sans-serif']
      }
    }
  },
  plugins: []
};
