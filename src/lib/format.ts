export const formatNumber = (n: number | string | undefined | null): string => {
  if (n === undefined || n === null || n === '') return '';
  const num = typeof n === 'string' ? Number(n) : n;
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString('en-US');
};

export const formatPrice = (n: number | string | undefined | null) => formatNumber(n);

export const formatMileage = (km: number | undefined | null) => {
  if (km === undefined || km === null) return '—';
  return `${formatNumber(km)} კმ`;
};

export function formatTimeAgo(dateStr: string | undefined | null): string {
  if (!dateStr) return '';
  const parsed = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
  const t = Date.parse(parsed);
  if (!Number.isFinite(t)) return '';
  const diff = Date.now() - t;
  if (diff < 60_000) return 'ახლა';
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} წუთის წინ`;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours} საათის წინ`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 30) return `${days} დღის წინ`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} თვის წინ`;
  const years = Math.floor(days / 365);
  return `${years} წლის წინ`;
}
