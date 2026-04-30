import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#1A1A1A",
          muted: "#3A3A3A"
        },
        bone: {
          DEFAULT: "#FAFAF7",
          warm: "#F2EFE8",
          line: "#E5E2D9"
        },
        gold: {
          DEFAULT: "#9B7A1A",
          deep: "#5C4810",
          bright: "#C8A23A",
          glow: "#E5C76B"
        },
        verde: {
          DEFAULT: "#4A6741",
          deep: "#2C4A2A",
          bright: "#7DA15F",
          glow: "#A8C290"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      maxWidth: {
        "8xl": "88rem"
      }
    }
  },
  plugins: []
};

export default config;
