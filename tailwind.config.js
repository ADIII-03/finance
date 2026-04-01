/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#07080a",
          900: "#0d0f12",
          800: "#141720",
          700: "#1c2030",
          600: "#252a3a",
        },
        acid: {
          DEFAULT: "#c6f135",
          dark: "#a8d020",
        },
        slate: {
          muted: "#8892a4",
        },
      },
    },
  },
  plugins: [],
};