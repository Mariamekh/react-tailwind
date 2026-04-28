import { t } from './i18n';

export const formatNumber = (n: number | string | undefined | null): string => {
  if (n === undefined || n === null || n === '') return '';
  const num = typeof n === 'string' ? Number(n) : n;
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString('en-US');
};

export const formatPrice = (n: number | string | undefined | null) => formatNumber(n);

export const formatMileage = (km: number | undefined | null) => {
  if (km === undefined || km === null) return '—';
  const formatted = km >= 100_000 ? formatNumber(km).replace(/,/g, ' ') : String(km);
  return `${formatted} ${t.units.km}`;
};

export function formatTimeAgo(dateStr: string | undefined | null): string {
  if (!dateStr) return '';
  const parsed = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
  const ts = Date.parse(parsed);
  if (!Number.isFinite(ts)) return '';
  const diff = Date.now() - ts;
  if (diff < 60_000) return t.time.now;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return t.time.minutesAgo(minutes);
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return t.time.hoursAgo(hours);
  const days = Math.floor(diff / 86_400_000);
  if (days < 30) return t.time.daysAgo(days);
  const months = Math.floor(days / 30);
  if (months < 12) return t.time.monthsAgo(months);
  const years = Math.floor(days / 365);
  return t.time.yearsAgo(years);
}
