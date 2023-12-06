/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      xs: "320px",
      ms: "480px",
      sm: "600px",
      md: "768px",
      lg: "1200px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      screens: {
        sm: "600px",
        md: "768px",
        lg: "1200px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      backgroundImage: {
        authimg: "url('./assets/backgroundimg.jpg')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          400: "#58B1FF",
          600: "#0E8BFF",
          700: "#0E6EFF",
        },
        secondary: {
          300: "#353535",
          400: "#4b4b4b",
          500: "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
