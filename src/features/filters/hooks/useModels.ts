import { useQueries } from '@tanstack/react-query';
import { getModels } from '../api/getModels';
import type { CarModel } from '../types';

export function useModelsForMans(manIds: string[]) {
  const queries = useQueries({
    queries: manIds.map((id) => ({
      queryKey: ['models', id],
      queryFn: () => getModels(id),
      staleTime: 1000 * 60 * 30,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const data: CarModel[] = queries.flatMap((q) => q.data ?? []);

  return { data, isLoading };
}
