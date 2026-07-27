import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gallery: "#1a1613",
        wall: "#4a4038",
        cream: "#d8cdb8",
        ink: "#f7f2ea",
        primary: "#8a3324",
        secondary: "#d8cdb8",
        accent: "#8a3324",
        magenta: "#8a3324",
        hairline: "#4a4038",
      },
      fontFamily: {
        display: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-mono)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
