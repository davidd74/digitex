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
        apple_banner:
          "url('https://media.binglee.com.au/f/0/4/1/f04185510d8913e0b42730ad78a103c86ada48dd_Apple_MPXV3ZP_A_iPhone_Banner_2.jpg')",

        samsung_banner:
          "url('https://s3.eu-west-1.amazonaws.com/dist.soreto.com/clientsrc/assets/samsunguk/default/jan23/banner-samsung-blog.jpg')",

        xiaomi_banner:
          "url('https://i0.wp.com/techweez.com/wp-content/uploads/2023/02/333054426_919281982591290_5663578417317068538_n.jpg?fit=2048%2C1152&ssl=1')",
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
