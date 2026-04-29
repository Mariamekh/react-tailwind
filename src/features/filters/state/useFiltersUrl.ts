import {
  createParser,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import type {
  DealType,
  FiltersState,
  Period,
  VehicleType,
} from '../types';
import type { SortOrder } from '@/features/products/types';

const VEHICLE_VALUES: VehicleType[] = ['car', 'tractor', 'moto'];
const PERIOD_VALUES: Period[] = [
  '',
  '1h',
  '2h',
  '3h',
  '6h',
  '12h',
  '1d',
  '2d',
  '3d',
  '1w',
  '2w',
  '3w',
];

interface MansValue {
  manIds: string[];
  modelsByMan: Record<string, string[]>;
}

const parseAsMans = createParser<MansValue>({
  parse(value) {
    if (!value) return null;
    const groups = value.split('-');
    const manIds: string[] = [];
    const modelsByMan: Record<string, string[]> = {};
    for (const group of groups) {
      if (!group) continue;
      const [manId, ...models] = group.split('.');
      if (!manId) continue;
      manIds.push(manId);
      if (models.length) modelsByMan[manId] = models;
    }
    return { manIds, modelsByMan };
  },
  serialize(value) {
    if (!value || value.manIds.length === 0) return '';
    return value.manIds
      .map((id) => {
        const models = value.modelsByMan[id] ?? [];
        return models.length ? `${id}.${models.join('.')}` : id;
      })
      .join('-');
  },
});

const EMPTY_MANS: MansValue = { manIds: [], modelsByMan: {} };

const parsers = {
  vehicle: parseAsStringEnum<VehicleType>(VEHICLE_VALUES).withDefault('car'),
  dealType: parseAsInteger.withDefault(0),
  mans: parseAsMans.withDefault(EMPTY_MANS),
  cats: parseAsArrayOf(parseAsInteger, '.').withDefault([]),
  priceFrom: parseAsString.withDefault(''),
  priceTo: parseAsString.withDefault(''),
  currency: parseAsInteger.withDefault(1),
  period: parseAsStringEnum<Period>(PERIOD_VALUES).withDefault(''),
  sortOrder: parseAsInteger.withDefault(1),
  page: parseAsInteger.withDefault(1),
};

export function useFiltersUrl() {
  return useQueryStates(parsers);
}

export function useVehicle() {
  return useQueryState('vehicle', parsers.vehicle);
}

export function useDealType() {
  return useQueryState('dealType', parsers.dealType);
}

export function useMans() {
  return useQueryState('mans', parsers.mans);
}

export function useCategoryIds() {
  return useQueryState('cats', parsers.cats);
}

export function usePriceFrom() {
  return useQueryState('priceFrom', parsers.priceFrom);
}

export function usePriceTo() {
  return useQueryState('priceTo', parsers.priceTo);
}

export function useCurrency() {
  return useQueryState('currency', parsers.currency) as unknown as [
    1 | 2,
    (next: 1 | 2) => Promise<URLSearchParams>,
  ];
}

export function usePeriod() {
  return useQueryState('period', parsers.period);
}

export function useSortOrder() {
  return useQueryState('sortOrder', parsers.sortOrder) as unknown as [
    SortOrder,
    (next: SortOrder) => Promise<URLSearchParams>,
  ];
}

export function usePage() {
  return useQueryState('page', parsers.page);
}

 
export function useAppliedFilters(): FiltersState {
  const [filters] = useFiltersUrl();
  return {
    vehicle: filters.vehicle,
    dealType: filters.dealType as DealType,
    manIds: filters.mans.manIds,
    modelsByMan: filters.mans.modelsByMan,
    categoryIds: filters.cats,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    currency: filters.currency as 1 | 2,
    period: filters.period,
    sortOrder: filters.sortOrder as SortOrder,
    page: filters.page,
  };
}
