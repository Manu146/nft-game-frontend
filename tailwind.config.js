module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cgray: "#0d1116",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
