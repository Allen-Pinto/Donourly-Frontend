/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      colors: {
        mustard: "#d79b00",
        black: "#000000",
      },
      fontFamily: {
        // Add Poppins as default sans font
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};