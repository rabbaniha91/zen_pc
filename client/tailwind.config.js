/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundColor: {
        "main-bg": "#191414",
        "secondry-bg": "#b3b3b3",
        "secondry-component-bg" : "#191616",
        "component-bg": "#292424",
        "btn-color": "#1db954",
        "disabled-btn": "#1db95466",
      },
      colors: {
        "text-color": "#fff",
        "text-secondry-color": "#191414",
        "text-title-color": "#b3b3b3",
        "icon-color": "#191414",
        "hover-icon": "#1db954",
        "text-hover": "#fff",
        "ring-color": "#1db954",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
