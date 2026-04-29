import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/getCategories';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
  });

export function useCategoryName(id: number | undefined): string | undefined {
  const { data } = useCategories();
  if (!id) return undefined;
  return data?.find((c) => c.category_id === id)?.title;
}
