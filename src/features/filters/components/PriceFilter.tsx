import { useFiltersDraft } from '../state/draftContext';
import { cn } from '@/lib/cn';
import { t } from '@/lib/i18n';
import { GelGlyphIcon, DollarGlyphIcon } from '@/shared/icons';
import { NumberInput } from '@/shared/ui/NumberInput';

export function PriceFilter() {
  const { draft, setPriceFrom, setPriceTo, setCurrency } = useFiltersDraft();
  const { priceFrom, priceTo, currency } = draft;

  return (
    <div className="w-full min-[1099px]:w-[202px]">
      <div className="flex items-center justify-between">
        <div className="font-sans text-[13px] font-medium text-ink-800">{t.filters.price}</div>
        <CurrencyToggle value={currency} onChange={setCurrency} />
      </div>
      <div className="mt-[12px] flex items-center gap-[3px]">
        <NumberInput placeholder={t.filters.priceFrom} value={priceFrom} onChange={setPriceFrom} />
        <span aria-hidden className="h-[2px] w-[6px] shrink-0 rounded-full bg-ink-500" />
        <NumberInput placeholder={t.filters.priceTo} value={priceTo} onChange={setPriceTo} />
      </div>
    </div>
  );
}

function CurrencyToggle({ value, onChange }: { value: 1 | 2; onChange: (v: 1 | 2) => void }) {
  const toggle = () => onChange(value === 1 ? 2 : 1);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={value === 1 ? t.filters.gel : t.filters.usd}
      className="relative h-6 w-[46px] rounded-full border border-surface-border bg-white"
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-[12px] bg-ink-800 transition-all duration-150',
          value === 1 ? '-left-px' : '-right-px',
        )}
      />
      <span className="relative z-10 flex h-full">
        <span className="flex flex-1 items-center justify-center">
          <GelGlyphIcon className={value === 1 ? 'text-white' : 'text-ink-500'} />
        </span>
        <span className="flex flex-1 items-center justify-center">
          <DollarGlyphIcon className={value === 2 ? 'text-white' : 'text-ink-500'} />
        </span>
      </span>
    </button>
  );
}
