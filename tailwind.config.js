/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E21A1A",
        secondary: "#57585A",
      },
      fontFamily: {
        verdana: ["Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
