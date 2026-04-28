import { cn } from '@/lib/cn';
import { CompareIcon, EditIcon, HeartIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';
import { ProductCardPhoto } from '../ProductCardPhoto';
import { VipBadge } from '../VipBadge';
import { CardTitle } from './CardTitle';
import { PriceDisplay } from './PriceDisplay';
import { CustomsBadge } from './CustomsBadge';
import { LocationLabel } from './LocationLabel';
import { SpecsGrid } from './SpecsGrid';
import { IconBtn } from './IconBtn';
import type { CardViewModel } from './cardViewModel';

interface Props {
  vm: CardViewModel;
  favorite: boolean;
  onToggleFavorite: () => void;
  heartButton: React.ReactNode;
}

export function ProductCardDesktop({ vm, favorite, onToggleFavorite, heartButton }: Props) {
  const { product, manName, modelLabel, title, locationLabel, locationFlag } = vm;

  return (
    <div className="hidden flex-col gap-4 md:flex md:flex-row">
      <ProductCardPhoto product={product} title={title} topRightContent={heartButton} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle
              manName={manName}
              modelLabel={modelLabel}
              year={product.prod_year}
              yearClassName="text-ink-500"
            />
          </div>

          <div className="flex shrink-0 items-center gap-4 text-right">
            <CustomsBadge
              passed={vm.customsPassed}
              currency={vm.currency}
              fee={vm.customsFeeDisplay}
              variant="desktop"
            />
            <LocationLabel
              label={locationLabel}
              flag={locationFlag}
              className="inline-flex items-center gap-1 font-sans text-[12px] font-normal leading-[16px] text-ink-600"
            />
          </div>
        </div>

        <div className="mt-[24px] flex flex-col md:flex-row md:items-start md:gap-4">
          <SpecsGrid product={product} />
          <div className="mt-3 flex items-center justify-between md:ml-auto md:mt-0 md:flex-col md:items-end md:text-right">
            <div className="flex flex-col items-end">
              <PriceDisplay value={vm.priceDisplay} currency={vm.currency} variant="desktop" />
            </div>
          </div>
        </div>

        <div className="mt-[29px] flex h-[20px] items-center justify-between">
          <div className="flex items-center gap-4 font-helvetica text-[12px] font-normal leading-none text-ink-600">
            {vm.vipLevel > 0 && <VipBadge level={vm.vipLevel} />}
            <div className="flex items-center gap-1">
              <span>
                {product.views ?? 0} {t.card.views}
              </span>
              {vm.timeAgo && (
                <>
                  <span
                    aria-hidden
                    className="inline-block h-[3px] w-[3px] rounded-full bg-ink-500"
                  />
                  <span>{vm.timeAgo}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex w-[80px] items-center justify-between text-ink-500">
            <IconBtn ariaLabel="edit">
              <EditIcon className="h-4 w-4" />
            </IconBtn>
            <IconBtn ariaLabel="compare">
              <CompareIcon className="h-4 w-4" />
            </IconBtn>
            <IconBtn ariaLabel="favorite" onClick={onToggleFavorite}>
              <HeartIcon
                className={cn('h-4 w-4', favorite && 'fill-accent-danger text-accent-danger')}
              />
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
