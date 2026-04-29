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
  categoryName: string;
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
  const mobile = hasChips ? 'h-[492px]' : 'h-[451px]';
  let desktop = 'md:h-[172px]';
  if (hasChips && hasDealer) desktop = 'md:min-h-[278px]';
  else if (hasChips) desktop = 'md:h-[217px]';
  else if (hasDealer) desktop = 'md:h-[233px]';
  return `${mobile} md:h-auto ${desktop}`;
}
