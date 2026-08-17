/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFCF7',
          100: '#F8F6F0',
          200: '#EFECE2',
          300: '#E4DFD0',
          400: '#D5CDBC',
          900: '#1F1D19',
        },
        ink: {
          black: '#141311',
          primary: '#24221E',
          muted: '#68645C',
          faint: '#9E998E',
          red: '#C84B31',
          blue: '#1E4E79',
          green: '#2D6A4F',
          gold: '#B8860B',
        },
        stamp: {
          red: '#B93826',
          blue: '#2B5B84',
          green: '#2A7B4C',
          amber: '#C27803',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Fraunces"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'retro-sm': '2px 2px 0px rgba(20, 19, 17, 0.9)',
        'retro': '4px 4px 0px rgba(20, 19, 17, 0.9)',
        'retro-lg': '6px 6px 0px rgba(20, 19, 17, 0.9)',
        'retro-red': '4px 4px 0px #B93826',
        'retro-blue': '4px 4px 0px #1E4E79',
        'paper-edge': '0 1px 3px rgba(0,0,0,0.05), 0 20px 40px -15px rgba(40,30,20,0.07)',
      },
      backgroundImage: {
        'grid-retro': 'radial-gradient(rgba(20, 19, 17, 0.12) 1px, transparent 1px)',
        'ruled-paper': 'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(20, 19, 17, 0.05) 28px)',
      }
    },
  },
  plugins: [],
}
