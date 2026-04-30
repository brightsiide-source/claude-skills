import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f4faea",
          100: "#e6f4cf",
          200: "#cfe9a3",
          300: "#b3da72",
          400: "#9bcd4d",
          500: "#8dc63f", // primary brand green from logo
          600: "#6fa530",
          700: "#557e26",
          800: "#406020",
          900: "#34501c",
          950: "#1a2c0c",
        },
        ink: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a",
          950: "#0a0a0a", // brand near-black
        },
        cream: "#f7f4ec",
        paper: {
          DEFAULT: "#faf7f0",
          warm: "#f3ede0",
          card: "#ffffff",
          edge: "#eae3d3",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-2": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-3": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "leaf-mesh":
          "radial-gradient(at 20% 10%, rgba(141,198,63,0.18) 0px, transparent 50%), radial-gradient(at 80% 30%, rgba(141,198,63,0.10) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(141,198,63,0.12) 0px, transparent 50%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "glow-leaf": "0 0 60px -10px rgba(141,198,63,0.5)",
        "tile": "0 30px 60px -20px rgba(0,0,0,0.3), 0 18px 36px -18px rgba(0,0,0,0.25)",
        "paper": "0 1px 2px rgba(20,20,15,0.04), 0 8px 24px -12px rgba(20,20,15,0.10)",
        "paper-lift": "0 1px 2px rgba(20,20,15,0.05), 0 24px 60px -20px rgba(20,20,15,0.18), 0 12px 24px -16px rgba(20,20,15,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
