import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { CurrencyGlyph } from './CurrencyGlyph';

interface Props {
  value: number;
  currency: 1 | 2;
  variant?: 'mobile' | 'desktop';
}

export function PriceDisplay({ value, currency, variant = 'mobile' }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 leading-none text-ink-800',
        variant === 'mobile'
          ? 'font-sans text-[20px] font-bold'
          : 'font-sailec text-[20px] font-medium',
      )}
    >
      <span>{formatPrice(value)}</span>
      <span className="inline-flex h-6 w-[26px] items-center justify-center rounded-[12px] bg-surface-tint">
        <CurrencyGlyph currency={currency} />
      </span>
    </div>
  );
}
