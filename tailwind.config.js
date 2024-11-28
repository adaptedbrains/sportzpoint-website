/** @type {import('tailwindcss').Config} */
const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
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
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        'pt-serif': ['var(--font-pt-serif)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Roboto, sans-serif',
            h1: {
              fontFamily: 'Roboto, sans-serif',
            },
            h2: {
              fontFamily: 'Roboto, sans-serif',
            },
            h3: {
              fontFamily: 'Roboto, sans-serif',
            },
            h4: {
              fontFamily: 'Roboto, sans-serif',
            },
          },
        },
      },
    },
  },
  plugins: [
    aspectRatio,
    forms,
    typography,
  ],
};
