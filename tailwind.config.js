/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0066cc',
          'blue-focus': '#0071e3',
          'blue-dark': '#2997ff',
          ink: '#1d1d1f',
          parchment: '#f5f5f7',
          pearl: '#fafafc',
          tile1: '#272729',
          tile2: '#2a2a2c',
          tile3: '#252527',
          hairline: '#e0e0e0',
          muted: '#7a7a7a',
          muted80: '#333333'
        },
        agri: {
          green: '#10b981',
          gold: '#f59e0b',
          crimson: '#ef4444',
          emerald: '#059669',
          earth: '#854d0e'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', '-apple-system', 'sans-serif']
      },
      borderRadius: {
        'apple-card': '18px',
        'apple-pill': '9999px',
        'apple-chip': '11px',
        'apple-sm': '8px'
      },
      boxShadow: {
        'apple-product': '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.05)',
        'apple-glow': '0 0 25px rgba(0, 102, 204, 0.25)',
        'apple-danger': '0 0 25px rgba(239, 68, 68, 0.25)'
      }
    },
  },
  plugins: [],
}
