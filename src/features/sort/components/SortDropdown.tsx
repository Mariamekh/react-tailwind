import { SelectDropdown, type SelectOption } from '@/shared/ui/SelectDropdown';
import { useFiltersUrl } from '@/features/filters/state/useFiltersUrl';
import { t } from '@/lib/i18n';
import type { SortOrder } from '@/features/products/types';

const options: SelectOption<SortOrder>[] = [
  { value: 1, label: t.sort.dateDesc },
  { value: 2, label: t.sort.dateAsc },
  { value: 3, label: t.sort.priceDesc },
  { value: 4, label: t.sort.priceAsc },
  { value: 5, label: t.sort.mileageDesc },
  { value: 6, label: t.sort.mileageAsc },
];

export function SortDropdown() {
  const [filters, setFilters] = useFiltersUrl();

  return (
    <SelectDropdown
      value={filters.sortOrder as SortOrder}
      options={options}
      onChange={(sortOrder) => setFilters({ sortOrder, page: 1 })}
      fallbackLabel={t.sort.label}
    />
  );
}
