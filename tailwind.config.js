/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "bitter": ["Bitter", "serif"],
      },
      container:{
        center: true,
      }
    },
  },
  plugins: [],
}