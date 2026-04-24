import { useMemo } from 'react';
import { MultiSelectCombobox, type OptionItem } from '@/shared/ui/MultiSelectCombobox';
import { useCategories } from '../hooks/useCategories';
import { useFiltersStore } from '../store/useFiltersStore';
import { FilterBlock } from './DealTypeSelect';

export function CategoryFilter() {
  const { data = [], isLoading } = useCategories();
  const vehicle = useFiltersStore((s) => s.vehicle);
  const categoryIds = useFiltersStore((s) => s.categoryIds);
  const toggleCategory = useFiltersStore((s) => s.toggleCategory);

  const vehicleType = vehicle === 'car' ? 0 : vehicle === 'tractor' ? 2 : 1;

  const options = useMemo<OptionItem[]>(() => {
    const filtered = data.filter((c) => c.category_type === vehicleType);
    return filtered.map((c) => ({
      value: String(c.category_id),
      label: c.title,
    }));
  }, [data, vehicleType]);

  return (
    <FilterBlock label="კატეგორია">
      <MultiSelectCombobox
        placeholder="ყველა კატეგორია"
        options={options}
        selected={categoryIds.map(String)}
        onToggle={(v) => toggleCategory(Number(v))}
        loading={isLoading}
      />
    </FilterBlock>
  );
}
