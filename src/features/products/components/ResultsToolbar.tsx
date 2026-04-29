import { useProducts } from '../hooks/useProducts';
import { SortDropdown } from '@/features/sort/components/SortDropdown';
import { PeriodQuickSelect } from './PeriodQuickSelect';
import { FilterIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';

interface Props {
  onOpenFilters: () => void;
}

export function ResultsToolbar({ onOpenFilters }: Props) {
  const { data } = useProducts();
  const total = data?.meta.total ?? 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenFilters}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-surface-border bg-white px-3 text-[14px] text-ink-800 hover:border-ink-500 md:hidden"
        >
          <FilterIcon className="h-4 w-4" />
          {t.filters.title}
        </button>
        <div className="pt-3 font-sans text-[16px] font-normal leading-[20px] text-ink-800">
          {total} {t.common.listings}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <PeriodQuickSelect />
        <SortDropdown />
      </div>
    </div>
  );
}
