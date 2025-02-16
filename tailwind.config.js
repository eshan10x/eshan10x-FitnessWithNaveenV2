/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans"],
      },
      colors: {
        primary: '#a5d83c',
        secondary: '#7E9F39',
      },
    },
  },
  plugins: [],
};
