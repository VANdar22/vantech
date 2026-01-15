/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EA1841',
          dark: '#ff4d6d',
        },
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        foreground: {
          light: '#1a1a1a',
          dark: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
