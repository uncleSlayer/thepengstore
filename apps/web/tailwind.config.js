/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackbg': '#1C1B1B',
        'skytheme': '#21D4B4'
      }
    }
  },
  plugins: [],
}