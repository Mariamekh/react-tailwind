import { useFiltersStore } from '../store/useFiltersStore';
import { cn } from '@/lib/cn';

export function PriceFilter() {
  const priceFrom = useFiltersStore((s) => s.draft.priceFrom);
  const priceTo = useFiltersStore((s) => s.draft.priceTo);
  const currency = useFiltersStore((s) => s.draft.currency);
  const setPriceFrom = useFiltersStore((s) => s.setDraftPriceFrom);
  const setPriceTo = useFiltersStore((s) => s.setDraftPriceTo);
  const setCurrency = useFiltersStore((s) => s.setDraftCurrency);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-sans text-[13px] font-medium text-ink-strong">ფასი</div>
        <CurrencyToggle value={currency} onChange={setCurrency} />
      </div>
      <div className="mt-[18px] flex items-center gap-[3px]">
        <NumberInput placeholder="დან" value={priceFrom} onChange={setPriceFrom} />
        <span
          aria-hidden
          className="h-[2px] w-[6px] shrink-0 rounded-full bg-ink-muted"
        />
        <NumberInput placeholder="მდე" value={priceTo} onChange={setPriceTo} />
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      className="h-10 w-[94px] rounded-lg border border-surface-border bg-white pb-[6px] pl-[10px] pr-2 pt-2 text-[14px] text-ink-strong placeholder:text-ink-muted focus:border-brand-orange"
    />
  );
}

function CurrencyToggle({
  value,
  onChange,
}: {
  value: 1 | 2;
  onChange: (v: 1 | 2) => void;
}) {
  const toggle = () => onChange(value === 1 ? 2 : 1);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={value === 1 ? 'ლარი' : 'დოლარი'}
      className="relative h-6 w-[46px] rounded-full border border-surface-border bg-white"
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-ink transition-all duration-150',
          value === 1 ? '-left-px' : '-right-px',
        )}
      />
      <span className="relative z-10 flex h-full">
        <span
          className={cn(
            'flex flex-1 items-center justify-center text-[12px] font-semibold leading-none',
            value === 1 ? 'text-white' : 'text-ink-muted',
          )}
        >
          ₾
        </span>
        <span
          className={cn(
            'flex flex-1 items-center justify-center text-[12px] font-semibold leading-none',
            value === 2 ? 'text-white' : 'text-ink-muted',
          )}
        >
          $
        </span>
      </span>
    </button>
  );
}
