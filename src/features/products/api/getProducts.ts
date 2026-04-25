import { api } from '@/lib/api';
import type { ProductsQueryParams, ProductsResponse } from '../types';

let loggedOnce = false;

export async function getProducts(params: ProductsQueryParams): Promise<ProductsResponse['data']> {
  const clean: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    clean[key] = value as string | number;
  }

  const { data } = await api.get<ProductsResponse>('/products/', { params: clean });
  const result = data?.data ?? { items: [], meta: { total: 0, page: 1 } };

  if (import.meta.env.DEV && !loggedOnce && result.items[0]) {
    loggedOnce = true;
    // eslint-disable-next-line no-console
    console.log('[products] first item keys:', Object.keys(result.items[0]));
    // eslint-disable-next-line no-console
    console.log('[products] first item:', result.items[0]);
  }

  return result;
}
