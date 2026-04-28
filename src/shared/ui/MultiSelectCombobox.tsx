import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { Checkbox } from './Checkbox';
import { Dropdown } from './Dropdown';
import { SearchIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';

export interface OptionItem {
  value: string;
  label: string;
}

interface Props {
  placeholder: string;
  options: OptionItem[];
  selected: string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  emptyText?: string;
}

export function MultiSelectCombobox({
  placeholder,
  options,
  selected,
  onToggle,
  disabled,
  loading,
  emptyText = t.filters.noOptions,
}: Props) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return options;
    const needle = q.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(needle));
  }, [options, q]);

  const triggerLabel = useMemo(() => {
    if (selected.length === 0) return placeholder;
    if (selected.length <= 2) {
      return options
        .filter((o) => selected.includes(o.value))
        .map((o) => o.label)
        .join(', ');
    }
    return `${placeholder} (${selected.length})`;
  }, [options, selected, placeholder]);

  return (
    <Dropdown
      fullWidth
      triggerClassName={cn(
        'h-10 w-full justify-between rounded-lg border-surface-border2 pl-3 pr-2 font-helvetica text-[14px] font-normal leading-none text-ink-600',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      chevronClassName="h-6 w-6 text-ink-600"
      panelClassName="w-[min(320px,92vw)] p-0"
      trigger={<span>{triggerLabel}</span>}
    >
      <div className="border-b border-surface-border p-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="h-9 w-full rounded-md border border-surface-border bg-white pl-8 pr-2 text-[14px] outline-none focus:border-brand-orange"
          />
        </div>
      </div>
      <div className="scrollbar-thin max-h-64 overflow-auto py-1">
        {loading && <div className="px-3 py-2 text-[13px] text-ink-500">{t.common.loading}</div>}
        {!loading && filtered.length === 0 && (
          <div className="px-3 py-2 text-[13px] text-ink-500">{emptyText}</div>
        )}
        {!loading &&
          filtered.map((o) => {
            const isSelected = selected.includes(o.value);
            return (
              <div
                key={o.value}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 hover:bg-surface-muted"
                onClick={() => onToggle(o.value)}
              >
                <Checkbox checked={isSelected} onChange={() => onToggle(o.value)} />
                <span className="truncate text-[14px]">{o.label}</span>
              </div>
            );
          })}
      </div>
    </Dropdown>
  );
}
