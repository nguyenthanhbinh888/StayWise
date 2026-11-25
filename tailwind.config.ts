import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16A36A",
          hover: "#128456",
          light: "#E8F7EF",
          dark: "#08734A",
        },
        navy: {
          DEFAULT: "#17324D",
          light: "#EAF0F6",
          dark: "#102438",
        },
        surface: "#FFFFFF",
        background: "#F7F9FC",
        border: "#E5EAF0",
        textPrimary: "#182230",
        textSecondary: "#667085",
        textMuted: "#98A2B3",
        warning: {
          DEFAULT: "#F5A623",
          light: "#FFF4DB",
        },
        danger: {
          DEFAULT: "#E45A5A",
          light: "#FDECEC",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#EAF3FF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)",
        "card-hover": "0 8px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)",
        modal: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
