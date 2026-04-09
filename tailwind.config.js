/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#080F1C', mid: '#0D1829', light: '#132035' },
        gold: { DEFAULT: '#C9A84C', dim: 'rgba(201,168,76,0.15)', bright: '#E8C96B' },
        slate: { custom: '#6B7A9A' },
        offwhite: '#EAE8E1',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}