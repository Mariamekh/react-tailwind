import { api } from '@/lib/api';
import type { Category } from '../types';

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<unknown>('/cats/get');
  const body = response.data;

  let list: unknown[] = [];
  if (Array.isArray(body)) {
    list = body;
  } else if (body && typeof body === 'object') {
    const asRecord = body as Record<string, unknown>;
    const data = asRecord.data;
    if (Array.isArray(data)) {
      list = data;
    } else if (data && typeof data === 'object') {
      const dataRecord = data as Record<string, unknown>;
      if (Array.isArray(dataRecord.items)) {
        list = dataRecord.items;
      } else {
        list = Object.values(dataRecord);
      }
    }
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[categories] raw response:', body, '→ parsed count:', list.length);
  }

  return list.filter(
    (c): c is Category => !!c && typeof c === 'object' && 'category_id' in c,
  );
}
