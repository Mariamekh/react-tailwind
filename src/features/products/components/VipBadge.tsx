import { cn } from '@/lib/cn';

type VipLevel = 1 | 2 | 3;

const variant: Record<VipLevel, { label: string; className: string }> = {
  1: { label: 'VIP', className: 'bg-accent-vip' },
  2: { label: 'VIP +', className: 'bg-accent-vip-plus' },
  3: { label: 'S-VIP', className: 'bg-accent-super-vip' },
};

export function VipBadge({ level }: { level: number }) {
  if (!level || level < 1 || level > 3) return null;
  const { label, className } = variant[level as VipLevel];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[100px] px-2 py-[3px] font-sans text-[10px] font-bold uppercase leading-none tracking-wide text-white',
        className,
      )}
    >
      {label}
    </span>
  );
}
