/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        primary: "#d70623",
        "primary-content": "#fedee2",
        "primary-dark": "#a5051b",
        "primary-light": "#f91737",

        secondary: "#06d751",
        "secondary-content": "#000000",
        "secondary-dark": "#05a53e",
        "secondary-light": "#17f968",

        background: "#f1eeef",
        foreground: "#fcfbfb",
        border: "#e2dcdd",

        copy: "#2a2223",
        "copy-light": "#705c5f",
        "copy-lighter": "#988184",

        success: "#06d706",
        warning: "#d7d706",
        error: "#d70606",

        "success-content": "#000000",
        "warning-content": "#000000",
        "error-content": "#fedede"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#f1eeef",
          foreground: "fcfbfb",
          primary: {
            DEFAULT: "#00FFFF",
          }
        },
        layout: {
          hoverOpacity: 0.85,
        }
      }
    }
  })],
}
