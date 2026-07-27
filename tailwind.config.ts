import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gallery: "#FAFAF7",
        wall: "#EDEBE4",
        cream: "#EDE6DA",
        ink: "#2B1B12",
        primary: "#8A2E1E",
        secondary: "#C9A876",
        accent: "#6B4226",
        hairline: "#C9C4B8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
