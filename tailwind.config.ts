import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gallery: "#0d1117",
        wall: "#131a24",
        cream: "#0f151f",
        ink: "#c3d1cd",
        primary: "#39ff14",
        secondary: "#ffb000",
        accent: "#56d4dd",
        magenta: "#ff5fd1",
        hairline: "#1e2a24",
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
