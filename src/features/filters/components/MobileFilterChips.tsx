import { useMemo } from 'react';
import { CloseIcon, FilterIcon } from '@/shared/icons';
import {
  useDealType,
  useMans,
  useCategoryIds,
  usePriceFrom,
  usePriceTo,
  useCurrency,
} from '../state/useFiltersUrl';
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
  const [dealType, setDealType] = useDealType();
  const [mans, setMans] = useMans();
  const [categoryIds, setCategoryIds] = useCategoryIds();
  const [priceFrom, setPriceFrom] = usePriceFrom();
  const [priceTo, setPriceTo] = usePriceTo();
  const [currency] = useCurrency();

  const { data: manList } = useManufacturers();
  const { data: cats } = useCategories();

  const chips = useMemo<Chip[]>(() => {
    const out: Chip[] = [];

    out.push({
      key: 'deal',
      label: dealType === 0 ? t.filters.forSale : t.filters.forRent,
      onRemove: () => setDealType(dealType === 0 ? 1 : 0),
    });

    for (const id of mans.manIds) {
      const m = manList?.find((x) => String(x.man_id) === String(id));
      if (!m) continue;
      out.push({
        key: `man-${id}`,
        label: m.man_name,
        onRemove: () => {
          const nextManIds = mans.manIds.filter((x) => x !== id);
          const nextModelsByMan = { ...mans.modelsByMan };
          delete nextModelsByMan[id];
          setMans({ manIds: nextManIds, modelsByMan: nextModelsByMan });
        },
      });
    }

    for (const id of categoryIds) {
      const c = cats?.find((x) => x.category_id === id);
      if (!c) continue;
      out.push({
        key: `cat-${id}`,
        label: c.title,
        onRemove: () => setCategoryIds(categoryIds.filter((x) => x !== id)),
      });
    }

    if (priceFrom || priceTo) {
      const symbol = currency === 2 ? '$' : '₾';
      const label = `${priceFrom || '0'} - ${priceTo || '∞'} ${symbol}`;
      out.push({
        key: 'price',
        label,
        onRemove: () => {
          setPriceFrom('');
          setPriceTo('');
        },
      });
    }

    return out;
  }, [
    dealType,
    setDealType,
    mans,
    setMans,
    categoryIds,
    setCategoryIds,
    priceFrom,
    priceTo,
    currency,
    setPriceFrom,
    setPriceTo,
    manList,
    cats,
  ]);

  return (
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={onOpenFilters}
        className="inline-flex h-8 shrink-0 items-center gap-[10px] rounded-full border border-surface-border bg-white pb-[10px] pl-3 pr-2 pt-2 font-sans text-[12px] font-normal leading-none text-ink-700"
      >
        <FilterIcon className="h-4 w-4" />
        {t.filters.title}
      </button>

      {chips.map((c) => (
        <button
          key={c.key}
          onClick={c.onRemove}
          className="inline-flex h-8 shrink-0 items-center gap-[10px] rounded-full bg-white pb-[10px] pl-3 pr-2 pt-2 font-sans text-[12px] font-normal leading-none text-ink-700"
        >
          {c.label}
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-chip-close">
            <CloseIcon className="h-2 w-2 text-ink-500" />
          </span>
        </button>
      ))}
    </div>
  );
}
