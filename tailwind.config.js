const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}", flowbite.content()],
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
        umber: "#5B4E46",
        darksilver: "#7E7265",
        rocketmetallic: "#8D7E72",
        paletaupe: "#B0927D",
        darkvanilla: "#D9C4AA",
        desertsand: "#DFC6B3",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
