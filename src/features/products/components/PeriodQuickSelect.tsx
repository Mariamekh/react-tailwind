import { SelectDropdown, type SelectOption } from '@/shared/ui/SelectDropdown';
import { useFiltersUrl } from '@/features/filters/state/useFiltersUrl';
import type { Period } from '@/features/filters/types';
import { t } from '@/lib/i18n';

const options: SelectOption<Period>[] = [
  { value: '1h', label: t.period.hours1 },
  { value: '2h', label: t.period.hours2 },
  { value: '3h', label: t.period.hours3 },
  { value: '1d', label: t.period.days1 },
  { value: '2d', label: t.period.days2 },
  { value: '3d', label: t.period.days3 },
  { value: '1w', label: t.period.weeks1 },
  { value: '2w', label: t.period.weeks2 },
  { value: '3w', label: t.period.weeks3 },
];

export function PeriodQuickSelect() {
  const [filters, setFilters] = useFiltersUrl();

  return (
    <SelectDropdown
      value={filters.period}
      options={options}
      onChange={(period) => setFilters({ period, page: 1 })}
      triggerWidthClass="w-[140px]"
      fallbackLabel={t.period.label}
    />
  );
}
