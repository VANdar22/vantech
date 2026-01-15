/** @type {import('tailwindcss').Config} */
const animate = require('tailwindcss-animate');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Clash Display Variable', 'sans-serif'],
        'clash-display': ['Clash Display Variable', 'sans-serif'],
        'montserrat-alt': ['Montserrat Alternates', 'sans-serif'],
        'erica-one': ['"Erica One"', 'cursive'],
        'climate-crisis': ['"Climate Crisis"', 'sans-serif'],
        sekuya: ['Sekuya', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          light: "#FFFFFF",
          dark: "#0F172A",
          DEFAULT: "#FFFFFF"
        },
        foreground: {
          light: "#1E293B",
          dark: "#F8FAFC",
          DEFAULT: "hsl(var(--foreground))"
        },
        primary: {
          light: "#0E38B1",
          dark: "#60A5FA",
          DEFAULT: "#0E38B1",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          light: "#F1F5F9",
          dark: "#1E293B",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          light: "#EF4444",
          dark: "#F87171",
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          light: "#F1F5F9",
          dark: "#1E293B",
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          light: "#F1F5F9",
          dark: "#1E293B",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}