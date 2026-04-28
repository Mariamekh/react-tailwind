import { cn } from '@/lib/cn';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import type { Period } from '@/features/filters/types';
import { t } from '@/lib/i18n';

const options: Array<{ value: Period; label: string }> = [
  { value: '', label: t.period.any },
  { value: '1h', label: t.period.last1h },
  { value: '3h', label: t.period.last3h },
  { value: '1d', label: t.period.last1d },
  { value: '3d', label: t.period.last3d },
  { value: '1w', label: t.period.last1w },
  { value: '2w', label: t.period.last2w },
];

export function PeriodQuickSelect() {
  const period = useFiltersStore((s) => s.period);
  const setPeriod = useFiltersStore((s) => s.setPeriod);
  const current = options.find((o) => o.value === period) ?? options[0];

  return (
    <Dropdown
      align="right"
      triggerClassName="h-10 w-[140px] gap-0 justify-between rounded-lg border border-surface-border py-2 pl-3 pr-2 font-sailec text-[12px] font-medium leading-[12px] text-ink-700"
      chevronClassName="h-6 w-6 text-ink-600"
      panelClassName=" w-[182px] overflow-auto rounded-lg border-surface-border2 px-0 py-2"
      trigger={<span className="truncate">{current.label}</span>}
    >
      {({ close }) => (
        <div>
          {options.map((o) => {
            const active = o.value === period;
            return (
              <button
                key={o.value}
                onClick={() => {
                  setPeriod(o.value);
                  close();
                }}
                className={cn(
                  'flex h-[32px] w-full items-center pl-4 text-left text-[14px] leading-[17px] transition-colors',
                  active
                    ? 'bg-surface-tint font-medium text-ink-800'
                    : 'text-ink-600 hover:bg-surface-muted',
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
}
