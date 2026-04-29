import { formatTimeAgo } from '@/lib/format';
import { useLocationName } from '@/features/filters/hooks/useLocations';
import { useCategoryName } from '@/features/filters/hooks/useCategories';
import { useCurrency } from '@/features/filters/state/useFiltersUrl';
import { useGelPerUsd, gelToUsd } from '@/lib/useCurrencyRate';
import { t } from '@/lib/i18n';
import type { Product } from '../../types';
import { getStickerChips } from './stickers';
import { toVipLevel, resolveLocationLabel, isCommercialDealer } from './helpers';
import { calculateClearanceFeeForProduct } from './customsFee';
import type { CardViewModel } from './cardViewModel';

export function useCardViewModel(product: Product, manName: string): CardViewModel {
  const [filterCurrency] = useCurrency();
  const gelPerUsd = useGelPerUsd();
  const { flag: locationFlag } = useLocationName(product.location_id);
  const resolvedCategoryName = useCategoryName(product.category_id);

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
    categoryName: product.category_name ?? resolvedCategoryName ?? t.specs.category,
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
