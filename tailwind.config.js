/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

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
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Set Roboto as the primary font
        georgia: ['Georgia', 'serif'],
        'pt-serif': ['var(--font-pt-serif)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Roboto, sans-serif', // Default font family for typography
            h1: {
              fontFamily: 'Roboto, sans-serif', // Update h1 for Roboto
            },
            h2: {
              fontFamily: 'Roboto, sans-serif', // Update h2 for Roboto
            },
            h3: {
              fontFamily: 'Roboto, sans-serif', // Update h3 for Roboto
            },
            h4: {
              fontFamily: 'Roboto, sans-serif', // Update h4 for Roboto
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    aspectRatio,
  ],
};
