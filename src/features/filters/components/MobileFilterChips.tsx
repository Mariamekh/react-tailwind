import { useMemo } from 'react';
import { CloseIcon, FilterIcon } from '@/shared/icons';
import { useFiltersStore } from '../store/useFiltersStore';
import { useManufacturers } from '../hooks/useManufacturers';
import { useCategories } from '../hooks/useCategories';
import { t } from '@/lib/i18n';

interface Props {
  onOpenFilters: () => void;
}

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function MobileFilterChips({ onOpenFilters }: Props) {
  const dealType = useFiltersStore((s) => s.dealType);
  const manIds = useFiltersStore((s) => s.manIds);
  const categoryIds = useFiltersStore((s) => s.categoryIds);
  const priceFrom = useFiltersStore((s) => s.priceFrom);
  const priceTo = useFiltersStore((s) => s.priceTo);
  const currency = useFiltersStore((s) => s.currency);

  const { data: mans } = useManufacturers();
  const { data: cats } = useCategories();

  const chips = useMemo<Chip[]>(() => {
    const out: Chip[] = [];

    out.push({
      key: 'deal',
      label: dealType === 0 ? t.filters.forSale : t.filters.forRent,
      onRemove: () => {
        const store = useFiltersStore.getState();
        store.setDraftDealType(dealType === 0 ? 1 : 0);
        store.applyDraft();
      },
    });

    for (const id of manIds) {
      const m = mans?.find((x) => String(x.man_id) === String(id));
      if (!m) continue;
      out.push({
        key: `man-${id}`,
        label: m.man_name,
        onRemove: () => {
          const store = useFiltersStore.getState();
          store.toggleDraftMan(id);
          store.applyDraft();
        },
      });
    }

    for (const id of categoryIds) {
      const c = cats?.find((x) => x.category_id === id);
      if (!c) continue;
      out.push({
        key: `cat-${id}`,
        label: c.title,
        onRemove: () => {
          const store = useFiltersStore.getState();
          store.toggleDraftCategory(id);
          store.applyDraft();
        },
      });
    }

    if (priceFrom || priceTo) {
      const symbol = currency === 2 ? '$' : '₾';
      const label = `${priceFrom || '0'} - ${priceTo || '∞'} ${symbol}`;
      out.push({
        key: 'price',
        label,
        onRemove: () => {
          const store = useFiltersStore.getState();
          store.setDraftPriceFrom('');
          store.setDraftPriceTo('');
          store.applyDraft();
        },
      });
    }

    return out;
  }, [dealType, manIds, categoryIds, priceFrom, priceTo, currency, mans, cats]);

  return (
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={onOpenFilters}
        className="inline-flex h-8 shrink-0 items-center gap-[10px] rounded-full border border-surface-border bg-white pb-[10px] pl-3 pr-2 pt-2 font-sans text-[12px] font-normal leading-none text-[#454857]"
      >
        <FilterIcon className="h-4 w-4" />
        {t.filters.title}
      </button>

      {chips.map((c) => (
        <button
          key={c.key}
          onClick={c.onRemove}
          className="inline-flex h-8 shrink-0 items-center gap-[10px] rounded-full bg-white pb-[10px] pl-3 pr-2 pt-2 font-sans text-[12px] font-normal leading-none text-[#454857]"
        >
          {c.label}
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F2F2F6]">
            <CloseIcon className="h-2 w-2 text-ink-500" />
          </span>
        </button>
      ))}
    </div>
  );
}
