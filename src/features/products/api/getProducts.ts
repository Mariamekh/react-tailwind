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
  const result = data?.data ?? {
    items: [],
    meta: { total: 0, per_page: 30, current_page: 1, last_page: 1 },
  };

  if (import.meta.env.DEV && !loggedOnce && result.items[0]) {
    loggedOnce = true;
    // eslint-disable-next-line no-console
    console.log('[products] first item keys:', Object.keys(result.items[0]));
    // eslint-disable-next-line no-console
    console.log('[products] first item:', result.items[0]);

    type AnyItem = Record<string, unknown>;
    const items = result.items as unknown as AnyItem[];

    const paidAddBuckets: Record<string, number> = {};
    for (const it of items) {
      const k = String(it.paid_add ?? 'undef');
      paidAddBuckets[k] = (paidAddBuckets[k] ?? 0) + 1;
    }

    const dealers = items.filter((it) => Number(it.dealer_user_id) > 0);
    const greenway = items.filter((it) => it.inspected_in_greenway === true);
    const techInspected = items.filter((it) => it.tech_inspection === true);

    // eslint-disable-next-line no-console
    console.log('[products] page summary:', {
      total: items.length,
      paid_add_buckets: paidAddBuckets,
      dealer_count: dealers.length,
      greenway_inspected_count: greenway.length,
      tech_inspected_count: techInspected.length,
    });

    if (dealers[0]) {
      // eslint-disable-next-line no-console
      console.log('[products] sample dealer:', {
        car_id: dealers[0].car_id,
        dealer_user_id: dealers[0].dealer_user_id,
        dealerId: dealers[0].dealerId,
        dealer_title: dealers[0].dealer_title,
        has_logo: dealers[0].has_logo,
        logo_ver: dealers[0].logo_ver,
        active_ads: dealers[0].active_ads,
        paid_add: dealers[0].paid_add,
      });
    }
    if (greenway[0]) {
      // eslint-disable-next-line no-console
      console.log('[products] sample greenway:', {
        car_id: greenway[0].car_id,
        paid_add: greenway[0].paid_add,
        inspected_in_greenway: greenway[0].inspected_in_greenway,
        tech_inspection: greenway[0].tech_inspection,
        prom_color: greenway[0].prom_color,
      });
    }
  }

  return result;
}
