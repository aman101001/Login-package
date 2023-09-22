/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/nn-login/**/*.{html,ts,scss,css}'

],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: true,
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: true,
  },

}

