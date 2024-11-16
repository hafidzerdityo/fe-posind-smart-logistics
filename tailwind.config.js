/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myLight: {
          primary: "#1f305e",
          secondary: "#3F72AF",
          accent: "#DBE2EF",
          neutral: "#F9F7F7",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
      "cupcake",
      "corporate",
    ],
  },
};
