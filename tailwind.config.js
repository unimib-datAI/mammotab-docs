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
      dorange: "#973F00",
      lorange: "#E99E57",
      bronze: "#BE682B",
      grizzly: "#804A14",
      },
    },
  },
  plugins: [],
}

