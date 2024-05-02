/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        slate: {
          DEFAULT: "#393d3f", // the default shade, could be dark theme text
          light: "#c6c5b9", // could be light theme text or dark theme background
          dark: "#2b2f31", // darker shade for dark theme elements
        },
        white: {
          DEFAULT: "#fdfdff", // used for backgrounds or text in the light theme
          dark: "#e6e6e6", // slightly darker for off-white needs
        },
        primary: {
          DEFAULT: "#1a6fd6", // primary color for buttons or links
          light: "#4b8ef1", // lighter shade for hover states
          dark: "#165ab6", // darker shade for active states
        },
      },
    },
  },
  plugins: [],
};
