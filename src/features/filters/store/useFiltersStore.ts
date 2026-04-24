import { create } from 'zustand';
import type { FiltersState, Period, VehicleType } from '../types';

interface FiltersActions {
  setVehicle: (v: VehicleType) => void;
  setDealType: (d: 0 | 1) => void;
  setManIds: (ids: string[]) => void;
  toggleMan: (id: string) => void;
  setModelIds: (ids: string[]) => void;
  toggleModel: (id: string) => void;
  setCategoryIds: (ids: number[]) => void;
  toggleCategory: (id: number) => void;
  setPriceFrom: (v: string) => void;
  setPriceTo: (v: string) => void;
  setCurrency: (c: 1 | 2) => void;
  setPeriod: (p: Period) => void;
  setSortOrder: (s: FiltersState['sortOrder']) => void;
  setPage: (p: number) => void;
  reset: () => void;
}

const initial: FiltersState = {
  vehicle: 'car',
  dealType: 0,
  manIds: [],
  modelIds: [],
  categoryIds: [],
  priceFrom: '',
  priceTo: '',
  currency: 1,
  period: '',
  sortOrder: 1,
  page: 1,
};

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
  ...initial,
  setVehicle: (vehicle) => set({ vehicle, page: 1 }),
  setDealType: (dealType) => set({ dealType, page: 1 }),
  setManIds: (manIds) => set({ manIds, modelIds: [], page: 1 }),
  toggleMan: (id) =>
    set((s) => {
      const has = s.manIds.includes(id);
      const next = has ? s.manIds.filter((x) => x !== id) : [...s.manIds, id];
      return { manIds: next, modelIds: has ? [] : s.modelIds, page: 1 };
    }),
  setModelIds: (modelIds) => set({ modelIds, page: 1 }),
  toggleModel: (id) =>
    set((s) => ({
      modelIds: s.modelIds.includes(id) ? s.modelIds.filter((x) => x !== id) : [...s.modelIds, id],
      page: 1,
    })),
  setCategoryIds: (categoryIds) => set({ categoryIds, page: 1 }),
  toggleCategory: (id) =>
    set((s) => ({
      categoryIds: s.categoryIds.includes(id)
        ? s.categoryIds.filter((x) => x !== id)
        : [...s.categoryIds, id],
      page: 1,
    })),
  setPriceFrom: (priceFrom) => set({ priceFrom, page: 1 }),
  setPriceTo: (priceTo) => set({ priceTo, page: 1 }),
  setCurrency: (currency) => set({ currency }),
  setPeriod: (period) => set({ period, page: 1 }),
  setSortOrder: (sortOrder) => set({ sortOrder, page: 1 }),
  setPage: (page) => set({ page }),
  reset: () => set({ ...initial }),
}));
