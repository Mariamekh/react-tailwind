import { useMemo } from 'react';
import { MultiSelectCombobox, type OptionItem } from '@/shared/ui/MultiSelectCombobox';
import { useCategories } from '../hooks/useCategories';
import { useFiltersDraft } from '../state/draftContext';
import { FilterBlock } from './FilterBlock';
import type { Category } from '../types';
import { t } from '@/lib/i18n';

function getLabel(category: Category): string {
  const raw = category as Category & {
    category_name?: string;
    title_ka?: string;
    title_en?: string;
    name?: string;
  };
  return (
    raw.title ||
    raw.category_name ||
    raw.title_ka ||
    raw.title_en ||
    raw.name ||
    String(category.category_id)
  );
}

export function CategoryFilter() {
  const { data = [], isLoading } = useCategories();
  const { draft, toggleCategory } = useFiltersDraft();
  const categoryIds = draft.categoryIds;

  const options = useMemo<OptionItem[]>(
    () =>
      data.map((c) => ({
        value: String(c.category_id),
        label: getLabel(c),
      })),
    [data],
  );

  return (
    <FilterBlock label={t.filters.category}>
      <MultiSelectCombobox
        placeholder={t.filters.allCategories}
        options={options}
        selected={categoryIds.map(String)}
        onToggle={(v) => toggleCategory(Number(v))}
        loading={isLoading}
      />
    </FilterBlock>
  );
}
