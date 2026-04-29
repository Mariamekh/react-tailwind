import { cn } from '@/lib/cn';
import { Dropdown } from './Dropdown';

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface Props<T extends string | number> {
  value: T;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  triggerWidthClass?: string;
  panelWidthClass?: string;
  fallbackLabel?: string;
  align?: 'left' | 'right';
}

export function SelectDropdown<T extends string | number>({
  value,
  options,
  onChange,
  triggerWidthClass = 'w-[164px]',
  panelWidthClass = 'w-[182px]',
  fallbackLabel = '',
  align = 'right',
}: Props<T>) {
  const current = options.find((o) => o.value === value);

  return (
    <Dropdown
      align={align}
      triggerClassName={cn(
        'h-10 gap-0 justify-between rounded-lg border border-surface-border py-2 pl-3 pr-2 font-sailec text-[12px] font-medium leading-[12px] text-ink-700',
        triggerWidthClass,
      )}
      chevronClassName="-mr-[3px] h-6 w-6 text-ink-600"
      panelClassName={cn(
        'overflow-auto rounded-lg border-surface-border2 px-0 py-2',
        panelWidthClass,
      )}
      trigger={<span className="truncate">{current?.label ?? fallbackLabel}</span>}
    >
      {({ close }) => (
        <div>
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={String(o.value)}
                onClick={() => {
                  onChange(o.value);
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
