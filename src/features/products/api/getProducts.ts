import { api } from '@/lib/api';
import type { ProductsQueryParams, ProductsResponse } from '../types';

export async function getProducts(params: ProductsQueryParams): Promise<ProductsResponse['data']> {
  const clean: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    clean[key] = value as string | number;
  }

  const { data } = await api.get<ProductsResponse>('/products/', { params: clean });

  return (
    data?.data ?? {
      items: [],
      meta: { total: 0, page: 1 },
    }
  );
}
