import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
          black: "#0A0A0A",
          "gray-dark": "#1A1A1A",
          "gray-mid": "#2A2A2A",
          "gray-light": "#3A3A3A",
          white: "#FFFFFF",
          "off-white": "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
