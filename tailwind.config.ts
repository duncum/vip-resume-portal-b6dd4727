
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        network: {
          gold: {
            DEFAULT: '#ab8755',
            light: '#c4a575',
            dark: '#8e6d40',
          },
          neutral: {
            black: '#000000',
            white: '#FFFFFF',
            gray: {
              100: '#F5F5F5',
              200: '#E5E5E5',
              300: '#D4D4D4',
              400: '#A3A3A3',
              500: '#737373',
              600: '#525252',
              700: '#404040',
              800: '#262626',
              900: '#171717',
            }
          }
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
