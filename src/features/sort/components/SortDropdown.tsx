import { cn } from '@/lib/cn';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';

const options: Array<{ value: 1 | 2 | 3 | 4 | 5 | 6; label: string }> = [
  { value: 1, label: 'თარიღი კლებადი' },
  { value: 2, label: 'თარიღი ზრდადი' },
  { value: 3, label: 'ფასი კლებადი' },
  { value: 4, label: 'ფასი ზრდადი' },
  { value: 5, label: 'გარბენი კლებადი' },
  { value: 6, label: 'გარბენი ზრდადი' },
];

export function SortDropdown() {
  const sortOrder = useFiltersStore((s) => s.sortOrder);
  const setSortOrder = useFiltersStore((s) => s.setSortOrder);
  const current = options.find((o) => o.value === sortOrder);

  return (
    <Dropdown
      align="right"
      triggerClassName="h-10 w-[140px] gap-0 justify-between rounded-lg border-surface-border pl-3 pr-2 font-sailec text-[12px] font-medium leading-none text-ink-medium"
      chevronClassName="h-6 w-6 text-ink-soft"
      panelClassName="w-[182px] overflow-hidden rounded-lg border-surface-border2 py-2"
      trigger={<span className="truncate">{current?.label ?? 'დალაგება'}</span>}
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
