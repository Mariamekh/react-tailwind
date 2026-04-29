import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { VehicleType } from '../types';
import { useAppliedFilters } from './useFiltersUrl';

export interface FiltersDraft {
  vehicle: VehicleType;
  dealType: 0 | 1;
  manIds: string[];
  modelsByMan: Record<string, string[]>;
  categoryIds: number[];
  priceFrom: string;
  priceTo: string;
  currency: 1 | 2;
}

interface DraftContextValue {
  draft: FiltersDraft;
  setDealType: (v: 0 | 1) => void;
  toggleMan: (id: string) => void;
  toggleModel: (manId: string, modelId: string) => void;
  toggleCategory: (id: number) => void;
  setPriceFrom: (v: string) => void;
  setPriceTo: (v: string) => void;
  setCurrency: (c: 1 | 2) => void;
  reset: () => void;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function FiltersDraftProvider({ children }: { children: ReactNode }) {
  const applied = useAppliedFilters();

  const buildInitial = useCallback(
    (): FiltersDraft => ({
      vehicle: applied.vehicle,
      dealType: applied.dealType,
      manIds: [...applied.manIds],
      modelsByMan: { ...applied.modelsByMan },
      categoryIds: [...applied.categoryIds],
      priceFrom: applied.priceFrom,
      priceTo: applied.priceTo,
      currency: applied.currency,
    }),
    [applied],
  );

  const [draft, setDraft] = useState<FiltersDraft>(buildInitial);

  // Resync draft when URL changes from outside the form
  // (e.g. vehicle tab click clears mans/cats; sort/page changes don't affect draft fields).
  const appliedKey = JSON.stringify({
    vehicle: applied.vehicle,
    manIds: applied.manIds,
    modelsByMan: applied.modelsByMan,
    categoryIds: applied.categoryIds,
  });
  useEffect(() => {
    setDraft(buildInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedKey]);

  const value: DraftContextValue = {
    draft,
    setDealType: (dealType) => setDraft((d) => ({ ...d, dealType })),
    toggleMan: (id) =>
      setDraft((d) => {
        const has = d.manIds.includes(id);
        const manIds = has ? d.manIds.filter((x) => x !== id) : [...d.manIds, id];
        const modelsByMan = { ...d.modelsByMan };
        if (has) delete modelsByMan[id];
        return { ...d, manIds, modelsByMan };
      }),
    toggleModel: (manId, modelId) =>
      setDraft((d) => {
        const existing = d.modelsByMan[manId] ?? [];
        const has = existing.includes(modelId);
        const next = has ? existing.filter((x) => x !== modelId) : [...existing, modelId];
        const modelsByMan = { ...d.modelsByMan };
        if (next.length === 0) delete modelsByMan[manId];
        else modelsByMan[manId] = next;
        return { ...d, modelsByMan };
      }),
    toggleCategory: (id) =>
      setDraft((d) => ({
        ...d,
        categoryIds: d.categoryIds.includes(id)
          ? d.categoryIds.filter((x) => x !== id)
          : [...d.categoryIds, id],
      })),
    setPriceFrom: (priceFrom) => setDraft((d) => ({ ...d, priceFrom })),
    setPriceTo: (priceTo) => setDraft((d) => ({ ...d, priceTo })),
    setCurrency: (currency) => setDraft((d) => ({ ...d, currency })),
    reset: () => setDraft(buildInitial()),
  };

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useFiltersDraft(): DraftContextValue {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error('useFiltersDraft must be used within FiltersDraftProvider');
  return ctx;
}
