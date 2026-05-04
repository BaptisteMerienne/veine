import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        veine: {
          50:  "#F4F9EE",
          100: "#E0F0D4",
          200: "#C8DDB8",
          300: "#A8CC98",
          400: "#4A7C40",
          500: "#2E6828",
          600: "#1A2E1C",
        },
        honey: {
          50:  "#FEF3C0",
          100: "#FEF0B0",
          200: "#F0C030",
          300: "#C89020",
          400: "#8A6010",
          500: "#3A2808",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
      },    
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

export default config