/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FD4100',
          'orange-soft': '#ff5a22',
          dark: '#13151a',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#F2F3F6',
          page: '#F2F3F6',
          border: '#e6e9ef',
          border2: '#D9DDE4',
          tint: '#F7F8FA',
        },
        ink: {
          DEFAULT: '#13151a',
          strong: '#2D3139',
          medium: '#4E525E',
          soft: '#6F7383',
          muted: '#8a92a1',
          icon: '#8C929B',
        },
        accent: {
          vip: '#5b6cff',
          'vip-plus': '#f5a623',
          'super-vip': '#ff4800',
          new: '#3b82f6',
          success: '#16a34a',
          danger: '#e11d48',
        },
        success: {
          50: '#EEF8F0',
          150: '#BEDDC1',
          200: '#A1D0A6',
          500: '#1EB676',
        },
      },
      fontFamily: {
        sans: [
          '"Helvetica Neue LT GEO"',
          '"Helvetica Neue"',
          'FiraGO',
          '"BPG Arial"',
          '"BPG Nino Mtavruli"',
          'system-ui',
          'sans-serif',
        ],
        sailec: [
          '"TBC Sailec"',
          '"Helvetica Neue LT GEO"',
          '"Helvetica Neue"',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 24, 39, 0.04), 0 1px 3px rgba(17, 24, 39, 0.06)',
        'card-hover': '0 4px 12px rgba(17, 24, 39, 0.08)',
        dropdown: '0 8px 24px rgba(17, 24, 39, 0.12)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
