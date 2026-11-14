/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./video/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#05070B',
          900: '#080A10',
          850: '#0D111A',
          800: '#121622',
          700: '#1C2333',
        },
        energy: {
          teal: '#00F2FE',
          cyan: '#00FFE0',
          glow: 'rgba(0, 242, 254, 0.4)',
        },
        secondary: {
          violet: '#8B5CF6',
          purple: '#7928CA',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        accent: {
          amber: '#F59E0B',
          sky: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
