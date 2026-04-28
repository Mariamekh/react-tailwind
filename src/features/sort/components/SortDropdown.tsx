import { SelectDropdown, type SelectOption } from '@/shared/ui/SelectDropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
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
  const sortOrder = useFiltersStore((s) => s.sortOrder);
  const setSortOrder = useFiltersStore((s) => s.setSortOrder);

  return (
    <SelectDropdown
      value={sortOrder}
      options={options}
      onChange={setSortOrder}
      fallbackLabel={t.sort.label}
    />
  );
}
