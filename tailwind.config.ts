import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#05060A",
        surface: "#0B0D14",
        surfaceAlt: "#0F1220",
        hairline: "#1A1F2E",
        ink: "#F5F7FA",
        muted: "#8B93A7",
        mutedDark: "#5B6376",
        accent: {
          DEFAULT: "#3D5CFF",
          bright: "#6E8CFF",
          dim: "#1C2B6B",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 60% at 70% 30%, rgba(61,92,255,0.20) 0%, rgba(61,92,255,0) 70%)",
      },
      keyframes: {
        waveform: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        waveform: "waveform 1.1s ease-in-out infinite",
        rise: "rise 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
