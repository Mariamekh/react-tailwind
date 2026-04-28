import { cn } from '@/lib/cn';
import { CheckmarkIcon, CheckmarkCircleIcon } from '@/shared/icons';
import { formatPrice } from '@/lib/format';
import { t } from '@/lib/i18n';

interface Props {
  passed: boolean;
  currency: 1 | 2;
  fee: number;
  variant: 'mobile' | 'desktop';
}

export function CustomsBadge({ passed, currency, fee, variant }: Props) {
  if (variant === 'desktop') {
    return passed ? (
      <span className="inline-flex items-center gap-[2px] font-sailec text-[11px] font-medium leading-[16px] text-success-300">
        <CheckmarkCircleIcon className="h-4 w-4" />
        {t.card.customsPassed}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 font-sailec text-[11px] font-medium leading-[16px] text-error-800">
        <span>{t.card.customsDue}</span>
        <span>
          {formatPrice(fee)} {currency === 2 ? '$' : '₾'}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-md pb-[6px] pl-2 pr-2 pt-[5px] font-sailec text-[10px] font-normal leading-none',
        passed ? 'bg-success-25 text-success-500' : 'bg-error-100 text-error-800',
      )}
    >
      {passed ? (
        <>
          <CheckmarkIcon className="h-4 w-4" />
          {t.card.customsPassed}
        </>
      ) : (
        <>
          <span>{t.card.customsDue}</span>
          <span>
            {formatPrice(fee)} {currency === 2 ? '$' : '₾'}
          </span>
        </>
      )}
    </span>
  );
}
