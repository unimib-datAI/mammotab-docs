/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
      colors: {
      dorange: "#DF8849",
      chocolate: "#88512D",
      bronze: "#E1D7D0",
      grizzly: "#3F3533",
      umber: "#504843",
      darksilver: "#6D625B",
      rocketmetallic: "#8A7D73",
      paletaupe: "#C1AC9E",
      darkvanilla: "#E1D9D0",
      desertsand: "#E6D6CA",
      terracotta: "#BE4F00",
      brick: "#682A00",
      },
    },
  },
  plugins: [],
}

