import { memo, useState } from 'react';
import { cn } from '@/lib/cn';
import { HeartFloatingIcon } from '@/shared/icons';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { formatTimeAgo } from '@/lib/format';
import { useLocationName } from '@/features/filters/hooks/useLocations';
import { useGelPerUsd, gelToUsd } from '@/lib/useCurrencyRate';
import type { Product } from '../types';
import { ProductCardFrame } from './ProductCardFrame';
import { ProductCardMobile } from './card/ProductCardMobile';
import { ProductCardDesktop } from './card/ProductCardDesktop';
import { StickerChips } from './card/StickerChips';
import { DealerFooter } from './card/DealerFooter';
import { getStickerChips } from './card/stickers';
import { toVipLevel, resolveLocationLabel, isCommercialDealer } from './card/helpers';
import { calculateClearanceFeeForProduct } from './card/customsFee';
import { getFrameClassName, type CardViewModel } from './card/cardViewModel';

interface Props {
  product: Product;
  manName: string;
}

function useCardViewModel(product: Product, manName: string): CardViewModel {
  const filterCurrency = useFiltersStore((s) => s.currency);
  const gelPerUsd = useGelPerUsd();
  const { flag: locationFlag } = useLocationName(product.location_id);

  const modelLabel = product.car_model ?? '';
  const priceGel = product.price_value || product.price;
  const customsPassed = product.customs_passed === true;
  const customsFeeGel = customsPassed ? 0 : calculateClearanceFeeForProduct(product);
  const isUsd = filterCurrency === 2;
  const stickerChips = getStickerChips(product.stickers);

  return {
    product,
    manName,
    modelLabel,
    title: `${manName} ${modelLabel}`.trim(),
    locationLabel: resolveLocationLabel(product, locationFlag),
    locationFlag,
    currency: filterCurrency,
    priceDisplay: isUsd ? gelToUsd(priceGel, gelPerUsd) : priceGel,
    customsPassed,
    customsFeeDisplay: isUsd ? gelToUsd(customsFeeGel, gelPerUsd) : customsFeeGel,
    vipLevel: toVipLevel(product.order_number),
    stickerChips,
    hasChips: stickerChips.length > 0,
    hasDealer: isCommercialDealer(product),
    isHighlighted: product.prom_color > 0,
    timeAgo: formatTimeAgo(product.order_date),
  };
}

function ProductCardImpl({ product, manName }: Props) {
  const [favorite, setFavorite] = useState(false);
  const vm = useCardViewModel(product, manName);

  const toggleFavorite = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorite((v) => !v);
  };

  // Heart button rendered as overlay on the photo (mobile only).
  const heartButton = (
    <button onClick={toggleFavorite} className="md:hidden" aria-label="favorite">
      <HeartFloatingIcon
        className={cn('h-[33px] w-[35px]', favorite ? 'text-accent-danger' : 'text-ink-800')}
      />
    </button>
  );

  const bordered = vm.isHighlighted
    ? false
    : vm.hasChips
      ? 'subtle'
      : vm.hasDealer
        ? 'default'
        : false;

  return (
    <ProductCardFrame
      highlighted={vm.isHighlighted}
      bordered={bordered}
      className={cn('cursor-pointer', getFrameClassName(vm.hasChips, vm.hasDealer))}
    >
      <ProductCardMobile vm={vm} heartButton={heartButton} />

      <ProductCardDesktop
        vm={vm}
        favorite={favorite}
        onToggleFavorite={() => toggleFavorite()}
        heartButton={heartButton}
      />

      <StickerChips chips={vm.stickerChips} variant="desktop" highlighted={vm.isHighlighted} />

      {vm.hasDealer && (
        <DealerFooter name={vm.product.dealer_title} listingCount={vm.product.active_ads} />
      )}
    </ProductCardFrame>
  );
}

export const ProductCard = memo(ProductCardImpl);
