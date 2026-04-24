import type { FiltersState } from '../types';
import type { ProductsQueryParams } from '@/features/products/types';

export function buildMansParam(manIds: string[], modelIds: string[]): string | undefined {
  if (manIds.length === 0) return undefined;
  if (manIds.length === 1) {
    const [manId] = manIds;
    if (modelIds.length === 0) return `${manId}`;
    return `${manId}.${modelIds.join('.')}`;
  }
  return manIds.map((id) => `${id}`).join('-');
}

export function buildCatsParam(categoryIds: number[]): string | undefined {
  if (categoryIds.length === 0) return undefined;
  return categoryIds.join('.');
}

export function filtersToQueryParams(s: FiltersState): ProductsQueryParams {
  const mans = buildMansParam(s.manIds, s.modelIds);
  const cats = buildCatsParam(s.categoryIds);

  return {
    ForRent: s.dealType,
    Mans: mans,
    Cats: cats,
    PriceFrom: s.priceFrom ? Number(s.priceFrom) : undefined,
    PriceTo: s.priceTo ? Number(s.priceTo) : undefined,
    Period: s.period || undefined,
    SortOrder: s.sortOrder,
    Page: s.page,
    CurrencyID: s.currency,
  };
}
