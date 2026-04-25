import { create } from 'zustand';
import type { FiltersState, Period, VehicleType } from '../types';

interface DraftSlice {
  vehicle: VehicleType;
  dealType: 0 | 1;
  manIds: string[];
  modelsByMan: Record<string, string[]>;
  categoryIds: number[];
  priceFrom: string;
  priceTo: string;
  currency: 1 | 2;
}

interface Store extends FiltersState {
  draft: DraftSlice;

  // Immediate — only the top-bar controls + pagination
  setPeriod: (p: Period) => void;
  setSortOrder: (s: FiltersState['sortOrder']) => void;
  setPage: (p: number) => void;

  // Draft setters (sidebar — committed on applyDraft())
  setDraftVehicle: (v: VehicleType) => void;
  setDraftDealType: (d: 0 | 1) => void;
  toggleDraftMan: (id: string) => void;
  toggleDraftModel: (manId: string, modelId: string) => void;
  toggleDraftCategory: (id: number) => void;
  setDraftPriceFrom: (v: string) => void;
  setDraftPriceTo: (v: string) => void;
  setDraftCurrency: (c: 1 | 2) => void;

  applyDraft: () => void;
  resetDraft: () => void;
}

const emptyDraft: DraftSlice = {
  vehicle: 'car',
  dealType: 0,
  manIds: [],
  modelsByMan: {},
  categoryIds: [],
  priceFrom: '',
  priceTo: '',
  currency: 1,
};

const initialApplied: FiltersState = {
  dealType: 0,
  manIds: [],
  modelsByMan: {},
  categoryIds: [],
  priceFrom: '',
  priceTo: '',
  currency: 1,
  period: '',
  sortOrder: 1,
  page: 1,
};

export const useFiltersStore = create<Store>((set) => ({
  ...initialApplied,
  draft: { ...emptyDraft },

  // Immediate ------------------------------------------------------------
  setPeriod: (period) => set({ period, page: 1 }),
  setSortOrder: (sortOrder) => set({ sortOrder, page: 1 }),
  setPage: (page) => set({ page }),

  // Draft ----------------------------------------------------------------
  setDraftVehicle: (vehicle) =>
    set((s) => ({
      // switching vehicle invalidates brand / model / category draft picks
      draft: {
        ...s.draft,
        vehicle,
        manIds: [],
        modelsByMan: {},
        categoryIds: [],
      },
    })),

  setDraftDealType: (dealType) =>
    set((s) => ({ draft: { ...s.draft, dealType } })),

  toggleDraftMan: (id) =>
    set((s) => {
      const has = s.draft.manIds.includes(id);
      const manIds = has
        ? s.draft.manIds.filter((x) => x !== id)
        : [...s.draft.manIds, id];
      const modelsByMan = { ...s.draft.modelsByMan };
      if (has) delete modelsByMan[id];
      return { draft: { ...s.draft, manIds, modelsByMan } };
    }),

  toggleDraftModel: (manId, modelId) =>
    set((s) => {
      const existing = s.draft.modelsByMan[manId] ?? [];
      const has = existing.includes(modelId);
      const next = has
        ? existing.filter((x) => x !== modelId)
        : [...existing, modelId];
      const modelsByMan = { ...s.draft.modelsByMan };
      if (next.length === 0) {
        delete modelsByMan[manId];
      } else {
        modelsByMan[manId] = next;
      }
      return { draft: { ...s.draft, modelsByMan } };
    }),

  toggleDraftCategory: (id) =>
    set((s) => ({
      draft: {
        ...s.draft,
        categoryIds: s.draft.categoryIds.includes(id)
          ? s.draft.categoryIds.filter((x) => x !== id)
          : [...s.draft.categoryIds, id],
      },
    })),

  setDraftPriceFrom: (priceFrom) =>
    set((s) => ({ draft: { ...s.draft, priceFrom } })),
  setDraftPriceTo: (priceTo) =>
    set((s) => ({ draft: { ...s.draft, priceTo } })),
  setDraftCurrency: (currency) =>
    set((s) => ({ draft: { ...s.draft, currency } })),

  applyDraft: () =>
    set((s) => ({
      dealType: s.draft.dealType,
      manIds: [...s.draft.manIds],
      modelsByMan: { ...s.draft.modelsByMan },
      categoryIds: [...s.draft.categoryIds],
      priceFrom: s.draft.priceFrom,
      priceTo: s.draft.priceTo,
      currency: s.draft.currency,
      page: 1,
    })),

  resetDraft: () => set({ draft: { ...emptyDraft } }),
}));
