import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "100%": { opacity: "1", transform: "translateY(-10px)" },
        },
        "fade-InUp": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        wiggle: "wiggle 0.4s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
