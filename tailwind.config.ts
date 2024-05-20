import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "main-color-blue": "#C0D3EE",
      "secondary-color-blue": "#394D6A",
      "page-background": "#DDE6F1",
      white: "#FFFFFF",
      "sign-in-first-color": "#9DAFDD",
      "sign-in-last-color": "#2F424E",
      "text-main-color": "#2E3546",
      "link-color": "#5B86F4",
      important: "#DE5252",
      settings: "#EFEFEF",
      "background-light-blue": "#E2EBF7",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
