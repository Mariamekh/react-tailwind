import type { FiltersState } from '../types';
import type { ProductsQueryParams } from '@/features/products/types';

export function buildMansParam(
  manIds: string[],
  modelsByMan: Record<string, string[]>,
): string | undefined {
  if (manIds.length === 0) return undefined;
  return manIds
    .map((manId) => {
      const models = modelsByMan[manId] ?? [];
      return models.length === 0 ? `${manId}` : `${manId}.${models.join('.')}`;
    })
    .join('-');
}

export function buildCatsParam(categoryIds: number[]): string | undefined {
  if (categoryIds.length === 0) return undefined;
  return categoryIds.join('.');
}

export function filtersToQueryParams(s: FiltersState): ProductsQueryParams {
  return {
    ForRent: s.dealType,
    Mans: buildMansParam(s.manIds, s.modelsByMan),
    Cats: buildCatsParam(s.categoryIds),
    PriceFrom: s.priceFrom ? Number(s.priceFrom) : undefined,
    PriceTo: s.priceTo ? Number(s.priceTo) : undefined,
    Period: s.period || undefined,
    SortOrder: s.sortOrder,
    Page: s.page,
    CurrencyID: s.currency,
  };
}
