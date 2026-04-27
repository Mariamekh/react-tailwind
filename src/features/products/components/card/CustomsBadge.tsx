import { cn } from '@/lib/cn';
import { CheckmarkIcon, CheckmarkCircleIcon } from '@/shared/icons';
import { formatPrice } from '@/lib/format';
import { COPY } from './constants';

interface Props {
  passed: boolean;
  /** 1 = GEL (₾), 2 = USD ($) — affects the displayed currency symbol only. */
  currency: 1 | 2;
  /** Total clearance fee in GEL when not yet customs-passed. */
  feeGel: number;
  variant: 'mobile' | 'desktop';
}

export function CustomsBadge({ passed, currency, feeGel, variant }: Props) {
  if (variant === 'desktop') {
    return passed ? (
      <span className="inline-flex items-center gap-[2px] font-sailec text-[11px] font-medium leading-[16px] text-success-300">
        <CheckmarkCircleIcon className="h-4 w-4" />
        {COPY.customsPassed}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 font-sailec text-[11px] font-medium leading-[16px] text-error-800">
        <span>{COPY.customsDue}</span>
        <span>
          {formatPrice(feeGel)} {currency === 2 ? '$' : '₾'}
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
          {COPY.customsPassed}
        </>
      ) : (
        <>
          <span>{COPY.customsDue}</span>
          <span>
            {formatPrice(feeGel)} {currency === 2 ? '$' : '₾'}
          </span>
        </>
      )}
    </span>
  );
}
