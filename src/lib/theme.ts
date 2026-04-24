export const theme = {
  color: {
    brand: '#FD4100',
    brandSoft: '#ff5a22',
    ink: '#13151a',
    inkSoft: '#6b7280',
    inkMuted: '#8a92a1',
    surface: '#ffffff',
    surfaceMuted: '#F2F3F6',
    surfaceBorder: '#e6e9ef',
    vip: '#5b6cff',
    vipPlus: '#f5a623',
    superVip: '#ff4800',
    newBadge: '#3b82f6',
    success: '#16a34a',
    successSoft: '#EEF8F0',
    successBorder: '#BEDDC1',
    successDivider: '#A1D0A6',
    danger: '#e11d48',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadow: {
    card: '0 1px 2px rgba(17, 24, 39, 0.04), 0 1px 3px rgba(17, 24, 39, 0.06)',
    cardHover: '0 4px 12px rgba(17, 24, 39, 0.08)',
    dropdown: '0 8px 24px rgba(17, 24, 39, 0.12)',
  },
  breakpoint: {
    md: '768px',
    lg: '1024px',
  },
} as const;

export type Theme = typeof theme;
