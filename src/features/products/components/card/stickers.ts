import {
  ShieldCheckIcon,
  CheckmarkCircleIcon,
  FuelIcon,
  SparkleIcon,
  StopwatchIcon,
  ClockListIcon,
} from '@/shared/icons';
import type { ComponentType, SVGProps } from 'react';
import { t } from '@/lib/i18n';

type StickerIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface StickerInfo {
  label: string;
  Icon: StickerIcon;
  iconClass: string;
}

const STICKER_PRIMES = [3, 5, 7, 11, 17, 19, 23, 29, 31, 47, 53, 59, 61, 67, 71, 73, 79];

export function decodeStickers(value: number | null | undefined): number[] {
  if (!value || value <= 1) return [];
  const ids: number[] = [];
  let remaining = value;
  for (const prime of STICKER_PRIMES) {
    while (remaining % prime === 0) {
      ids.push(prime);
      remaining = remaining / prime;
      if (remaining === 1) return ids;
    }
  }
  return ids;
}

export const STICKER_INFO: Record<number, StickerInfo> = {
  3: { label: t.stickers.intact, Icon: ShieldCheckIcon, iconClass: 'text-success-200' },
  5: { label: t.stickers.cleanHistory, Icon: ClockListIcon, iconClass: 'text-sticker-blue' },
  7: { label: t.stickers.newImport, Icon: CheckmarkCircleIcon, iconClass: 'text-success-500' },
  11: { label: t.stickers.economic, Icon: FuelIcon, iconClass: 'text-success-300' },
  17: { label: t.stickers.unpainted, Icon: CheckmarkCircleIcon, iconClass: 'text-success-500' },
  23: { label: t.stickers.urgent, Icon: StopwatchIcon, iconClass: 'text-error-800' },
  29: { label: t.stickers.fromEurope, Icon: CheckmarkCircleIcon, iconClass: 'text-success-500' },
  31: { label: t.stickers.pristine, Icon: SparkleIcon, iconClass: 'text-success-600' },
  47: { label: t.stickers.fromAmerica, Icon: CheckmarkCircleIcon, iconClass: 'text-success-500' },
  71: { label: t.stickers.centerWarranty, Icon: ShieldCheckIcon, iconClass: 'text-success-200' },
};

export function getStickerChips(stickers: number | null | undefined): StickerInfo[] {
  return decodeStickers(stickers)
    .map((id) => STICKER_INFO[id])
    .filter((info): info is StickerInfo => info != null);
}
