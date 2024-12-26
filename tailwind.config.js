/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans"],
      },
      colors: {
        primary: '#a5d83c',  // Define your custom color
      },
    },
  },
  plugins: [],
};
