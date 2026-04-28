import type { Product } from '../../types';
import type { LocationFlag } from '@/features/filters/hooks/useLocations';
import type { StickerInfo } from './stickers';
import type { VipLevel } from './helpers';

export interface CardViewModel {
  product: Product;
  manName: string;
  modelLabel: string;
  title: string;
  locationLabel: string;
  locationFlag: LocationFlag;
  currency: 1 | 2;
  priceDisplay: number;
  customsPassed: boolean;
  customsFeeDisplay: number;
  vipLevel: VipLevel;
  stickerChips: StickerInfo[];
  hasChips: boolean;
  hasDealer: boolean;
  isHighlighted: boolean;
  timeAgo: string | null;
}

export function getFrameClassName(hasChips: boolean, hasDealer: boolean): string {
  if (hasChips && hasDealer) return 'md:min-h-[278px]';
  if (hasChips) return 'md:h-[217px]';
  if (hasDealer) return 'md:h-[233px]';
  return 'md:h-[172px]';
}
