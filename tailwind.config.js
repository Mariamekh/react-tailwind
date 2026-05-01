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
          400: '#8996AE',
          500: '#8C929B',
          600: '#6F7383',
          700: '#454857',
          800: '#272A37',
          900: '#1B1D25',
        },
        accent: {
          vip: '#4A6CFA',
          'vip-plus': '#FEC900',
          'super-vip': '#FF3B30',
          new: '#3b82f6',
          success: '#16a34a',
          danger: '#FF3B30',
        },
        error: {
          100: '#FFE3E3',
          800: '#FF3B30',
        },
        success: {
          25: '#EEFBF1',
          50: '#F0F9F7',
          150: '#CEE8E5',
          200: '#59D8C9',
          300: '#26B753',
          500: '#1EB676',
          600: '#1BBA6B',
        },
        chip: {
          blue: '#EFF6FE',
          gray: '#EEF2F7',
          close: '#F2F2F6',
        },
        tab: {
          inactive: '#F9F9FB',
        },
        sticker: {
          blue: '#11A6DA',
        },
        divider: {
          DEFAULT: '#E4E7EB',
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
        sailec: ['"TBCX"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 24, 39, 0.04), 0 1px 3px rgba(17, 24, 39, 0.06)',
        'card-hover': '0 4px 12px rgba(17, 24, 39, 0.08)',
        dropdown: '0px 4px 20px 0px #A4AEC166',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
