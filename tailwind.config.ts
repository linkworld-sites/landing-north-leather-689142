import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gallery: "#1b120c",
        wall: "#241a13",
        cream: "#ecd9c9",
        ink: "#f7f0e6",
        primary: "#c17c62",
        secondary: "#a8b596",
        accent: "#c17c62",
        magenta: "#e3b9ab",
        hairline: "#3a2a20",
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
