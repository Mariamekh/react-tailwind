import { SelectDropdown, type SelectOption } from '@/shared/ui/SelectDropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import type { Period } from '@/features/filters/types';
import { t } from '@/lib/i18n';

const options: SelectOption<Period>[] = [
  { value: '1h', label: t.period.hours1 },
  { value: '3h', label: t.period.hours3 },
  { value: '6h', label: t.period.hours6 },
  { value: '12h', label: t.period.hours12 },
  { value: '1d', label: t.period.hours24 },
];

export function PeriodQuickSelect() {
  const period = useFiltersStore((s) => s.period);
  const setPeriod = useFiltersStore((s) => s.setPeriod);

  return (
    <SelectDropdown
      value={period}
      options={options}
      onChange={setPeriod}
      triggerWidthClass="w-[140px]"
      fallbackLabel={t.period.label}
    />
  );
}
