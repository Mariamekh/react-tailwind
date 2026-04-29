import { CompareIcon, EditIcon, FlameViewsIcon } from '@/shared/icons';
import { formatMileage } from '@/lib/format';
import { t } from '@/lib/i18n';
import { ProductCardPhoto } from '../ProductCardPhoto';
import { VipBadge } from '../VipBadge';
import { CardTitle } from './CardTitle';
import { PriceDisplay } from './PriceDisplay';
import { CustomsBadge } from './CustomsBadge';
import { LocationLabel } from './LocationLabel';
import { StickerChips } from './StickerChips';
import { IconBtn } from './IconBtn';
import { engineLitersDisplay, gearLabel, fuelLabel } from './helpers';
import type { CardViewModel } from './cardViewModel';

interface Props {
  vm: CardViewModel;
  heartButton: React.ReactNode;
}

export function ProductCardMobile({ vm, heartButton }: Props) {
  const { product, manName, modelLabel, title, locationLabel, locationFlag } = vm;

  return (
    <div className="flex flex-col md:hidden">
      <div className="flex h-[18px] items-baseline gap-2">
        {vm.vipLevel > 0 && <VipBadge level={vm.vipLevel} variant="mobile" />}
        <CardTitle
          manName={manName}
          modelLabel={modelLabel}
          year={product.prod_year}
          yearClassName="text-ink-400"
        />
      </div>

      <div className="mt-[10px] flex items-center justify-between pl-[2px]">
        <PriceDisplay value={vm.priceDisplay} currency={vm.currency} />
        <CustomsBadge
          passed={vm.customsPassed}
          currency={vm.currency}
          fee={vm.customsFeeDisplay}
          variant="mobile"
        />
      </div>

      <div className="mt-4">
        <ProductCardPhoto product={product} title={title} topRightContent={heartButton} />
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-x-4 gap-y-[6px] font-sans text-[12px] font-normal leading-[15px] text-ink-700">
        <span>{formatMileage(product.car_run_km)}</span>
        <span>{product.category_name ?? t.specs.category}</span>
        <span>
          {engineLitersDisplay(product)} {fuelLabel(product)}
        </span>
        <span>
          {t.card.steeringPrefix} {product.drive_type ?? t.specs.driveSide}
        </span>
        <span>{gearLabel(product)}</span>
        <LocationLabel
          label={locationLabel}
          flag={locationFlag}
          className="inline-flex items-center gap-1"
        />
      </div>

      <StickerChips chips={vm.stickerChips} variant="mobile" />

      <div className="-mx-4 mt-[14px] flex items-center justify-between border-t-[0.5px] border-divider px-4 pt-3">
        <div className="flex items-center gap-2 font-sans text-[12px] font-normal leading-4 text-ink-500">
          <FlameViewsIcon className="-mt-[1px] h-4 w-4 text-ink-400" />
          <span>
            {product.views ?? 0} {t.card.views}
          </span>
          {vm.timeAgo && (
            <>
              <span aria-hidden className="inline-block h-[3px] w-[3px] rounded-full bg-ink-500" />
              <span>{vm.timeAgo}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-[10px] text-ink-500">
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
