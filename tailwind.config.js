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
      },
      colors: {
        'gray': {
          '100': '#E1E1E6',
          '300': '#C4C4CC',
          '400': '#8D8D99',
          '500': '#7C7C8A',
          '600': '#323238',
          '700': '#29292E',
          '800': '#202024',
          '900': '#121214'
        },
        'brand': {
          '50': '#59e092',
          '100': '#4fd688',
          '200': '#45cc7e',
          '300': '#3bc274',
          '400': '#31b86a',
          '500': '#27ae60',
          '600': '#1da456',
          '700': '#139a4c',
          '800': '#099042',
          '900': '#015F43'
        },
        'red': {
          '50': '#dd5460',
          '100': '#d34a56',
          '200': '#c9404c',
          '300': '#bf3642',
          '400': '#b52c38',
          '500': '#ab222e',
          '600': '#a11824',
          '700': '#970e1a',
          '800': '#8d0410',
          '900': '#830006'
        }
      }
    }
  },
  plugins: []
};
