import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'mobile-sm': '280px',
      mobile: '350px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
      'desktop-xl': '1650px'
    },
    extend: {
      backgroundImage: {
        "voter": "url('/images/user_vote.png')",
      },
      keyframes: {
        flyDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        flyUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        flyLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        flyRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        appear: {
          "0%": { opacity: "0", display: "none" },
          "100%": { opacity: "1", display: "block" },
        },
        hidden: {
          "0%": { opacity: "1", display: "block" },
          "100%": { opacity: "0", display: "none" },
        },
        skeleton: {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        spin: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" }
        },
      },
      animation: {
        "fly-down": "flyDown 0.6s forwards",
        "fly-up": "flyUp 0.6s forwards",
        "fly-right": "flyRight 0.5s forwards",
        "fly-left": "flyLeft 0.5s forwards",
        appear: "appear 0.5s forwards",
        hidden: "hidden 0.5s forwards",
        skeleton: "skeleton 1.4s ease infinite",
        "spin": "spin 3s linear infinite"
      },
    },
  },
  plugins: [],
};
export default config;