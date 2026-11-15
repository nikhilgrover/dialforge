/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dial: {
          dark: '#0f172a',
          charcoal: '#18181b',
          navy: '#0b192c',
          silver: '#e2e8f0',
        },
        brass: {
          50: '#fdfbf7',
          100: '#f7f2e7',
          200: '#ede1ca',
          300: '#dfc9a3',
          400: '#ceac78',
          500: '#be9256',
          600: '#af7e48',
          700: '#91643c',
          800: '#765135',
          900: '#61432e',
        },
        lume: {
          bgw9: '#38bdf8', // Ice blue glow
          c3: '#4ade80',   // Vivid green glow
          patina: '#fef08a' // Vintage cream
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}

