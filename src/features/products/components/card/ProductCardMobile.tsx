import { CompareIcon, EditIcon, FlameViewsIcon } from '@/shared/icons';
import { formatMileage } from '@/lib/format';
import type { Product } from '../../types';
import type { LocationFlag } from '@/features/filters/hooks/useLocations';
import { ProductCardPhoto } from '../ProductCardPhoto';
import { CardTitle } from './CardTitle';
import { PriceDisplay } from './PriceDisplay';
import { CustomsBadge } from './CustomsBadge';
import { LocationLabel } from './LocationLabel';
import { StickerChips } from './StickerChips';
import { IconBtn } from './IconBtn';
import { COPY, SPEC_FALLBACK } from './constants';
import { formatEngineLiters } from './helpers';
import type { StickerInfo } from './stickers';

interface Props {
  product: Product;
  manName: string;
  modelLabel: string;
  title: string;
  locationLabel: string;
  locationFlag: LocationFlag;
  currency: 1 | 2;
  priceValue: number;
  customsPassed: boolean;
  customsFeeGel: number;
  stickerChips: StickerInfo[];
  timeAgo: string | null;
  heartButton: React.ReactNode;
}

export function ProductCardMobile({
  product,
  manName,
  modelLabel,
  title,
  locationLabel,
  locationFlag,
  currency,
  priceValue,
  customsPassed,
  customsFeeGel,
  stickerChips,
  timeAgo,
  heartButton,
}: Props) {
  return (
    <div className="flex flex-col pt-[2px] md:hidden md:pt-0">
      <CardTitle
        manName={manName}
        modelLabel={modelLabel}
        year={product.prod_year}
        yearClassName="text-ink-400"
      />

      <div className="mt-[10px] flex items-center justify-between">
        <PriceDisplay value={priceValue} currency={currency} />
        <CustomsBadge
          passed={customsPassed}
          currency={currency}
          feeGel={customsFeeGel}
          variant="mobile"
        />
      </div>

      <div className="mt-4">
        <ProductCardPhoto product={product} title={title} topRightContent={heartButton} />
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-x-4 gap-y-[6px] font-sans text-[12px] font-normal leading-[15px] text-ink-700">
        <span>{formatMileage(product.car_run_km)}</span>
        <span>{product.category_name ?? SPEC_FALLBACK.category}</span>
        <span>
          {formatEngineLiters(product.engine_volume)} {product.fuel_type ?? SPEC_FALLBACK.fuel}
        </span>
        <span>
          {COPY.steeringPrefix} {product.drive_type ?? SPEC_FALLBACK.driveSide}
        </span>
        <span>{product.gear_type ?? SPEC_FALLBACK.gear}</span>
        <LocationLabel
          label={locationLabel}
          flag={locationFlag}
          className="inline-flex items-center gap-1"
        />
      </div>

      <StickerChips chips={stickerChips} variant="mobile" />

      <div className="mt-[14px] flex items-center justify-between border-t border-divider pt-3">
        <div className="flex items-center gap-2 font-['Helvetica_Neue_LT'] text-[12px] font-normal leading-4 text-ink-500">
          <FlameViewsIcon className="h-4 w-4 text-ink-400" />
          <span>
            {product.views ?? 0} {COPY.views}
          </span>
          {timeAgo && (
            <>
              <span aria-hidden className="inline-block h-[3px] w-[3px] rounded-full bg-ink-500" />
              <span>{timeAgo}</span>
            </>
          )}
        </div>
        <div className="flex items-center text-ink-500">
          <IconBtn ariaLabel="compare">
            <CompareIcon className="h-4 w-4" />
          </IconBtn>
          <IconBtn ariaLabel="edit">
            <EditIcon className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
