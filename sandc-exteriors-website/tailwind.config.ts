import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#111111",
          dark: "#1A1A1A",
          charcoal: "#2D2D2D",
          silver: "#C0C0C0",
          lightsilver: "#D9D9D9",
          slate: "#6B7280",
          light: "#F5F5F5",
          white: "#FFFFFF",
          accent: "#C0C0C0",
        },
      },
      fontFamily: {
        heading: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
