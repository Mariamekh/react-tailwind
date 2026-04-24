import { useMemo } from 'react';
import {
  ManufacturerModelCombobox,
  type OptionItem,
} from '@/shared/ui/ManufacturerModelCombobox';
import { useManufacturers } from '../hooks/useManufacturers';
import { useModelsForMans } from '../hooks/useModels';
import { useFiltersStore } from '../store/useFiltersStore';
import { FilterBlock } from './DealTypeSelect';

export function ManufacturerFilter() {
  const { data: mans = [], isLoading: mansLoading } = useManufacturers();
  const vehicle = useFiltersStore((s) => s.vehicle);
  const manIds = useFiltersStore((s) => s.manIds);
  const modelIds = useFiltersStore((s) => s.modelIds);
  const toggleMan = useFiltersStore((s) => s.toggleMan);
  const toggleModel = useFiltersStore((s) => s.toggleModel);

  const { data: modelsData, isLoading: modelsLoading } = useModelsForMans(manIds);

  const manufacturers = useMemo<OptionItem[]>(() => {
    const relevant = mans.filter((m) => {
      if (vehicle === 'car') return m.is_car === '1';
      if (vehicle === 'moto') return m.is_moto === '1';
      return m.is_spec === '1';
    });
    return relevant.map((m) => ({ value: m.man_id, label: m.man_name }));
  }, [mans, vehicle]);

  const models = useMemo<OptionItem[]>(
    () =>
      modelsData.map((m) => ({
        value: String(m.model_id),
        label: m.model_name,
      })),
    [modelsData],
  );

  return (
    <FilterBlock label="მწარმოებელი">
      <ManufacturerModelCombobox
        placeholder="ყველა მწარმოებელი"
        manufacturers={manufacturers}
        models={models}
        selectedManIds={manIds}
        selectedModelIds={modelIds}
        onToggleMan={toggleMan}
        onToggleModel={toggleModel}
        loadingManufacturers={mansLoading}
        loadingModels={modelsLoading}
      />
    </FilterBlock>
  );
}
