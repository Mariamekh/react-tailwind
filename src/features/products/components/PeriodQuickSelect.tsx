import { cn } from '@/lib/cn';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import type { Period } from '@/features/filters/types';

const options: Array<{ value: Period; label: string }> = [
  { value: '', label: 'ნებისმიერი' },
  { value: '1h', label: 'ბოლო 1 საათი' },
  { value: '3h', label: 'ბოლო 3 საათი' },
  { value: '1d', label: 'ბოლო 1 დღე' },
  { value: '3d', label: 'ბოლო 3 დღე' },
  { value: '1w', label: 'ბოლო 1 კვირა' },
  { value: '2w', label: 'ბოლო 2 კვირა' },
];

export function PeriodQuickSelect() {
  const period = useFiltersStore((s) => s.period);
  const setPeriod = useFiltersStore((s) => s.setPeriod);
  const current = options.find((o) => o.value === period) ?? options[0];

  return (
    <Dropdown
      align="right"
      triggerClassName="h-10 w-[180px] gap-0 justify-between rounded-lg border-surface-border pl-3 pr-2 font-sailec text-[12px] font-medium leading-none text-ink-medium"
      chevronClassName="h-6 w-6 text-ink-soft"
      panelClassName="w-[182px] overflow-hidden rounded-lg border-surface-border2 py-2"
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
                  'block w-full border-y border-transparent px-[15px] py-2 text-left text-[14px] leading-none transition-colors',
                  active
                    ? 'border-surface-border2 bg-surface-tint font-medium text-ink-strong'
                    : 'text-ink-soft hover:bg-surface-muted',
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
