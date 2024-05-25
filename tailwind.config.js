/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
      extend: {
        colors: {
          indigo: {
            400: '#818cf8',
            600: '#4f46e5',
          },
          purple: {
            400: '#c084fc',
            600: '#9333ea',
          }
        }
      }
    },
   plugins: [
    require('@tailwindcss/typography'), 
  ],
}
