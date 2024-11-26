/** @type {import('tailwindcss').Config} */
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
        georgia: ['Georgia', 'serif'],
        'pt-serif': ['var(--font-pt-serif)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Georgia, serif',
            h1: {
              fontFamily: 'var(--font-pt-serif), Georgia, serif',
            },
            h2: {
              fontFamily: 'var(--font-pt-serif), Georgia, serif',
            },
            h3: {
              fontFamily: 'var(--font-pt-serif), Georgia, serif',
            },
            h4: {
              fontFamily: 'var(--font-pt-serif), Georgia, serif',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
