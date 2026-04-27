import { memo, useState } from 'react';
import { cn } from '@/lib/cn';
import { HeartFloatingIcon } from '@/shared/icons';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { formatTimeAgo } from '@/lib/format';
import { useLocationName } from '@/features/filters/hooks/useLocations';
import type { Product } from '../types';
import { ProductCardFrame } from './ProductCardFrame';
import { ProductCardMobile } from './card/ProductCardMobile';
import { ProductCardDesktop } from './card/ProductCardDesktop';
import { StickerChips } from './card/StickerChips';
import { DealerFooter } from './card/DealerFooter';
import { getStickerChips } from './card/stickers';
import { toVipLevel, resolveLocationLabel, isCommercialDealer } from './card/helpers';
import { calculateClearanceFeeForProduct } from './card/customsFee';
import { useGelPerUsd, gelToUsd } from '@/lib/useCurrencyRate';

interface Props {
  product: Product;
  manName: string;
}

function ProductCardImpl({ product, manName }: Props) {
  const [favorite, setFavorite] = useState(false);

  const modelLabel = product.car_model ?? '';
  const title = `${manName} ${modelLabel}`.trim();

  const { flag: locationFlag } = useLocationName(product.location_id);
  const locationLabel = resolveLocationLabel(product, locationFlag);

  const filterCurrency = useFiltersStore((s) => s.currency);
  const priceValue = product.price_value || product.price;

  const gelPerUsd = useGelPerUsd();
  const isCustomsPassed = product.customs_passed === true;
  const customsFeeGel = isCustomsPassed ? 0 : calculateClearanceFeeForProduct(product);
  const customsFeeDisplay =
    filterCurrency === 2 ? gelToUsd(customsFeeGel, gelPerUsd) : customsFeeGel;
  const vipLevel = toVipLevel(product.order_number);
  const stickerChips = getStickerChips(product.stickers);
  const hasChips = stickerChips.length > 0;
  const isHighlighted = product.prom_color > 0;
  const hasDealer = isCommercialDealer(product);
  const timeAgo = formatTimeAgo(product.order_date);

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

  return (
    <ProductCardFrame
      highlighted={isHighlighted}
      bordered={isHighlighted ? false : hasChips ? 'subtle' : hasDealer ? 'default' : false}
      className={cn(
        'cursor-pointer',
        hasChips && hasDealer
          ? 'md:min-h-[278px]'
          : hasChips
            ? 'md:h-[217px]'
            : hasDealer
              ? 'md:h-[233px]'
              : 'md:h-[172px]',
      )}
    >
      <ProductCardMobile
        product={product}
        manName={manName}
        modelLabel={modelLabel}
        title={title}
        locationLabel={locationLabel}
        locationFlag={locationFlag}
        currency={filterCurrency}
        priceValue={priceValue}
        customsPassed={isCustomsPassed}
        customsFeeGel={customsFeeDisplay}
        stickerChips={stickerChips}
        timeAgo={timeAgo}
        heartButton={heartButton}
      />

      <ProductCardDesktop
        product={product}
        manName={manName}
        modelLabel={modelLabel}
        title={title}
        locationLabel={locationLabel}
        locationFlag={locationFlag}
        currency={filterCurrency}
        priceValue={priceValue}
        customsPassed={isCustomsPassed}
        customsFeeGel={customsFeeDisplay}
        vipLevel={vipLevel}
        timeAgo={timeAgo}
        favorite={favorite}
        onToggleFavorite={() => toggleFavorite()}
        heartButton={heartButton}
      />

      <StickerChips chips={stickerChips} variant="desktop" highlighted={isHighlighted} />

      {hasDealer && <DealerFooter name={product.dealer_title} listingCount={product.active_ads} />}
    </ProductCardFrame>
  );
}

export const ProductCard = memo(ProductCardImpl);
