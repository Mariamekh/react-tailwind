import { useMemo } from 'react';
import { ManufacturerModelCombobox, type OptionItem } from '@/shared/ui/ManufacturerModelCombobox';
import { useManufacturers } from '../hooks/useManufacturers';
import { useModelsForMans } from '../hooks/useModels';
import { useFiltersStore } from '../store/useFiltersStore';
import { FilterBlock } from './DealTypeSelect';

export function ManufacturerFilter() {
  const { data: mans = [], isLoading: mansLoading } = useManufacturers();
  const vehicle = useFiltersStore((s) => s.draft.vehicle);
  const manIds = useFiltersStore((s) => s.draft.manIds);
  const modelsByMan = useFiltersStore((s) => s.draft.modelsByMan);
  const toggleMan = useFiltersStore((s) => s.toggleDraftMan);
  const toggleModel = useFiltersStore((s) => s.toggleDraftModel);

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

  const modelIdToManId = useMemo(() => {
    const map = new Map<string, string>();
    for (const m of modelsData) map.set(String(m.model_id), String(m.man_id));
    return map;
  }, [modelsData]);

  const selectedModelIds = useMemo(() => Object.values(modelsByMan).flat(), [modelsByMan]);

  const handleToggleModel = (modelId: string) => {
    const manId = modelIdToManId.get(modelId);
    if (!manId) return;
    toggleModel(manId, modelId);
  };

  return (
    <FilterBlock label="მწარმოებელი">
      <ManufacturerModelCombobox
        placeholder="ყველა მწარმოებელი"
        manufacturers={manufacturers}
        models={models}
        selectedManIds={manIds}
        selectedModelIds={selectedModelIds}
        onToggleMan={toggleMan}
        onToggleModel={handleToggleModel}
        loadingManufacturers={mansLoading}
        loadingModels={modelsLoading}
      />
    </FilterBlock>
  );
}
