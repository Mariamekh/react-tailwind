import { cn } from '@/lib/cn';

type VipLevel = 1 | 2 | 3;

const variant: Record<VipLevel, { label: string; className: string }> = {
  1: { label: 'VIP', className: 'bg-accent-vip' },
  2: { label: 'VIP +', className: 'bg-accent-vip-plus' },
  3: { label: 'S-VIP', className: 'bg-accent-super-vip' },
};

interface Props {
  level: number;
  variant?: 'mobile' | 'desktop';
}

export function VipBadge({ level, variant: cardVariant = 'desktop' }: Props) {
  if (!level || level < 1 || level > 3) return null;
  const { label, className } = variant[level as VipLevel];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap font-sans font-bold uppercase tracking-normal text-white',
        cardVariant === 'mobile'
          ? 'h-[18px] rounded-[6px] px-[6px] pb-[2px] pt-[4px] text-[9px] leading-[9px]'
          : 'h-[20px] rounded-[100px] px-2 pb-[2px] pt-[4px] text-[10px] leading-[10px]',
        className,
      )}
    >
      {label}
    </span>
  );
}
