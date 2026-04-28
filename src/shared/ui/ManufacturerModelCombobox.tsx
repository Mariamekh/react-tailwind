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
  manufacturers: OptionItem[];
  models: OptionItem[];
  selectedManIds: string[];
  selectedModelIds: string[];
  onToggleMan: (value: string) => void;
  onToggleModel: (value: string) => void;
  loadingManufacturers?: boolean;
  loadingModels?: boolean;
}

type Tab = 'mans' | 'models';

export function ManufacturerModelCombobox({
  placeholder,
  manufacturers,
  models,
  selectedManIds,
  selectedModelIds,
  onToggleMan,
  onToggleModel,
  loadingManufacturers,
  loadingModels,
}: Props) {
  const [tab, setTab] = useState<Tab>('mans');
  const [q, setQ] = useState('');

  const options = tab === 'mans' ? manufacturers : models;
  const selected = tab === 'mans' ? selectedManIds : selectedModelIds;
  const onToggle = tab === 'mans' ? onToggleMan : onToggleModel;
  const loading = tab === 'mans' ? loadingManufacturers : loadingModels;

  const filtered = useMemo(() => {
    if (!q.trim()) return options;
    const needle = q.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(needle));
  }, [options, q]);

  const triggerLabel = useMemo(() => {
    const total = selectedManIds.length + selectedModelIds.length;
    if (total === 0) return placeholder;
    const manLabels = manufacturers
      .filter((m) => selectedManIds.includes(m.value))
      .map((m) => m.label);
    if (total <= 2) return manLabels.join(', ') || placeholder;
    return `${placeholder} (${total})`;
  }, [manufacturers, selectedManIds, selectedModelIds.length, placeholder]);

  const modelsDisabled = selectedManIds.length === 0;

  return (
    <Dropdown
      fullWidth
      triggerClassName="h-10 w-full justify-between rounded-lg border-surface-border2 pl-3 pr-2 font-['Helvetica_Neue_LT'] text-[14px] font-normal leading-none text-ink-600"
      chevronClassName="h-6 w-6 text-ink-600"
      panelClassName="w-[min(340px,92vw)] p-0"
      trigger={<span>{triggerLabel}</span>}
    >
      <div className="flex border-b border-surface-border">
        <TabButton active={tab === 'mans'} onClick={() => setTab('mans')}>
          {t.filters.manufacturer}
          {selectedManIds.length > 0 && <Count>{selectedManIds.length}</Count>}
        </TabButton>
        <TabButton
          active={tab === 'models'}
          onClick={() => !modelsDisabled && setTab('models')}
          disabled={modelsDisabled}
        >
          {t.filters.model}
          {selectedModelIds.length > 0 && <Count>{selectedModelIds.length}</Count>}
        </TabButton>
      </div>

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
        {!loading && tab === 'models' && modelsDisabled && (
          <div className="px-3 py-2 text-[13px] text-ink-500">{t.filters.selectManufacturer}</div>
        )}
        {!loading && filtered.length === 0 && !modelsDisabled && (
          <div className="px-3 py-2 text-[13px] text-ink-500">{t.common.notFound}</div>
        )}
        {!loading &&
          !(tab === 'models' && modelsDisabled) &&
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

function TabButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium transition-colors',
        active ? 'border-b-2 border-brand-orange text-brand-orange' : 'text-ink-600',
        disabled && 'opacity-40',
      )}
    >
      {children}
    </button>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-semibold text-white">
      {children}
    </span>
  );
}
