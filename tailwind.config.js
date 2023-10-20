/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        lightBlue: '#DBEEFF',
        blue: '#89C2F8',
        darkBlue: '#243546',
        lightRed: '#FFE3DF',
        red: '#F69181',
        darkRed: '#742A1F',
        lightGreen: '#EBF8EF',
        green: '#A0D3AE',
        darkGreen: '#2E5739',
        lightOrange: '#FFEFCE',
        orange: '#FEC556',
        darkOrange: '#6A4702',
        lightPurple: '#F0ECF2',
        purple: '#C6A9D8',
        darkPurple: '#5A3A6D',
        lightGray: '#F1F1F2',
        gray: '#9696A0',
        darkGray: '#141414'
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        nunito: ['Nunito', 'serif'],
      },
      boxShadow: {
        'lg' : '8px 8px 0px rgba(0, 0, 0, 1)',
        'md': '4px 4px 0px rgba(0, 0, 0, 1)',
        'sm': '2px 2px 0px rgba(0, 0, 0, 1)',
        'lg-blur': '8px 8px 0 rgba(0, 0, 0, 0.5)',
        'sm-inner': 'inset 2px 2px 0px rgba(0, 0, 0, 0.25)',
        'md-inner': 'inset 3px 3px 0px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ]
}

