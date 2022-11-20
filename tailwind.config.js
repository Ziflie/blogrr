/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Space: ["Space Grotesk", "sans-serif"],
      Greek: ["Anton", "sans-serif"]
    },
    extend: {
      colors: {
        'Green': "#0ACF83",
        'Purple': "#F4EFFD",
        'Paars': "#9C6DF2"
      },
    },
  },
  plugins: [],
};
