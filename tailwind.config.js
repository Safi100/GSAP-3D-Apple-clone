/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        blue: '#2997FF',
        gray: {
          default: '#86868b',
          '100': '#94928d',
          '200': '#afafaf',
          '300': '#42424570',
        },
        zinc: '#101010',
    },
  },
  plugins: [],
  }
}