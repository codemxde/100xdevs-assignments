/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          800: "#002a5a",
        },
        green: {
          400: "#3edfcf",
        },
        slate: {
          500: "#7f95ac",
        },
        white: "#fefefe",
        para: "#8a9eb3",
        input: "#183f6a",
        placeholder: "##456487",
        continue: "#7f95ab",
        continueSelected: "#40dece",
        otpField: "#2c5479",
      },
    },
  },
  plugins: [],
};
