import { cn } from '@/lib/cn';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useFiltersStore } from '../store/useFiltersStore';

const options: Array<{ value: 0 | 1; label: string }> = [
  { value: 0, label: 'იყიდება' },
  { value: 1, label: 'ქირავდება' },
];

export function DealTypeSelect() {
  const dealType = useFiltersStore((s) => s.draft.dealType);
  const setDealType = useFiltersStore((s) => s.setDraftDealType);
  const current = options.find((o) => o.value === dealType);

  return (
    <FilterBlock label="გარიგების ტიპი">
      <Dropdown
        fullWidth
        matchTriggerWidth
        triggerClassName="h-10 w-full justify-between rounded-lg border-surface-border2 pl-3 pr-2 font-sailec text-[13px] font-medium leading-none text-ink-600"
        chevronClassName="h-6 w-6 text-ink-600"
        panelClassName="p-1"
        trigger={<span className="truncate">{current?.label ?? ''}</span>}
      >
        {({ close }) => (
          <div className="py-0.5">
            {options.map((o) => {
              const active = o.value === dealType;
              return (
                <button
                  key={o.value}
                  onClick={() => {
                    setDealType(o.value);
                    close();
                  }}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-[14px] transition-colors',
                    active
                      ? 'bg-brand-orange/10 font-semibold text-brand-orange'
                      : 'text-ink-800 hover:bg-surface-muted',
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        )}
      </Dropdown>
    </FilterBlock>
  );
}

export function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-sailec text-[12px] font-medium text-ink-800">
        {label}
      </div>
      {children}
    </div>
  );
}
