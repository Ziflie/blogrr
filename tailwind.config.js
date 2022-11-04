/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Space: ["Space Grotesk", "sans-serif"],
    },
    extend: {
      colors: {
        'Green': "#0ACF83",
      },
    },
  },
  plugins: [],
};
