import { cn } from '@/lib/cn';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { t } from '@/lib/i18n';

const options: Array<{ value: 1 | 2 | 3 | 4 | 5 | 6; label: string }> = [
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
  const current = options.find((o) => o.value === sortOrder);

  return (
    <Dropdown
      align="right"
      triggerClassName="h-10 w-[164px] gap-0 justify-between rounded-lg border border-surface-border py-2 pl-3 pr-2 font-sailec text-[12px] font-medium leading-[12px] text-ink-700"
      chevronClassName="h-6 w-6 text-ink-600"
      panelClassName="  w-[182px] overflow-auto rounded-lg border-surface-border2 px-0 py-2"
      trigger={<span className="truncate">{current?.label ?? t.sort.label}</span>}
    >
      {({ close }) => (
        <div>
          {options.map((o) => {
            const active = o.value === sortOrder;
            return (
              <button
                key={o.value}
                onClick={() => {
                  setSortOrder(o.value);
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
