import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts } from '../api/getProducts';
import { useAppliedFilters } from '@/features/filters/state/useFiltersUrl';
import { filtersToQueryParams } from '@/features/filters/lib/buildQueryParams';

export function useProducts() {
  const filters = useAppliedFilters();
  const params = filtersToQueryParams(filters);

  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
}
