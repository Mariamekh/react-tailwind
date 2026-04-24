import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts } from '../api/getProducts';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { filtersToQueryParams } from '@/features/filters/lib/buildQueryParams';

export function useProducts() {
  const state = useFiltersStore();
  const params = filtersToQueryParams(state);

  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
}
