/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        easyliftBlue: "#0015B9",
        easyliftBlueSoft: "#1E3A8A",
        easyliftAccent: "#3B82F6",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.18)",
      },
    },
  },
  plugins: [],
};
