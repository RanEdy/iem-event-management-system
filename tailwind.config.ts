import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:
      {
        'bluedark-gradient-r': 'linear-gradient(to right, #323f4f, #035c7d)',
        'bluedark-gradient-tr': 'linear-gradient(to top right, #323f4f, #035c7d)',
      }
    },
  },
  plugins: [],
};
export default config;
