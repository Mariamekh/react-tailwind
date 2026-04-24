import { staticApi } from '@/lib/api';
import type { Manufacturer } from '../types';

export async function getManufacturers(): Promise<Manufacturer[]> {
  const { data } = await staticApi.get<Manufacturer[] | Record<string, Manufacturer>>(
    '/js/mans.json',
  );

  const list = Array.isArray(data) ? data : Object.values(data);

  return list
    .filter((m): m is Manufacturer => !!m && typeof m === 'object' && 'man_id' in m)
    .sort((a, b) => {
      const as = Number(a.sort_order) || 9999;
      const bs = Number(b.sort_order) || 9999;
      if (as !== bs) return as - bs;
      return a.man_name.localeCompare(b.man_name);
    });
}
