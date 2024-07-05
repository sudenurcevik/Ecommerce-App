module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        appBg: "#F9F9F9",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
      height: {
        fullScreen: "90vh",
      },
      minHeight: {
        fullScreen: "86vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
