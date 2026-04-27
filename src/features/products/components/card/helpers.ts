import type { Product } from '../../types';
import type { LocationFlag } from '@/features/filters/hooks/useLocations';
import { USA_LOC_ID, IN_TRANSIT_LOC_ID, VIP_THRESHOLD, COPY } from './constants';

export type VipLevel = 0 | 1 | 2 | 3;

export function toVipLevel(orderNumber: number | undefined): VipLevel {
  if (!orderNumber || orderNumber <= 0) return 0;
  if (orderNumber >= VIP_THRESHOLD.S_VIP) return 3;
  if (orderNumber >= VIP_THRESHOLD.VIP_PLUS) return 2;
  if (orderNumber >= VIP_THRESHOLD.VIP) return 1;
  return 0;
}

export function resolveLocationLabel(product: Product, flag: LocationFlag): string {
  if (product.location_id === USA_LOC_ID) return COPY.usa;
  if (product.location_id === IN_TRANSIT_LOC_ID) return COPY.inTransit;
  if (flag === 'georgia') return COPY.georgia;
  return product.location_name ?? '';
}

export function isCommercialDealer(product: Product): boolean {
  return (
    (product.user_type === 1 || product.user_type === 2) && product.dealer_title.trim().length > 0
  );
}

export function formatEngineLiters(volume: number | null | undefined): string {
  return volume ? (volume / 1000).toFixed(1) : '—';
}
