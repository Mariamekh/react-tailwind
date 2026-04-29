import { memo, useState } from 'react';
import { cn } from '@/lib/cn';
import { HeartFloatingIcon } from '@/shared/icons';
import type { Product } from '../types';
import { ProductCardFrame } from './ProductCardFrame';
import { ProductCardMobile } from './card/ProductCardMobile';
import { ProductCardDesktop } from './card/ProductCardDesktop';
import { StickerChips } from './card/StickerChips';
import { DealerFooter } from './card/DealerFooter';
import { getFrameClassName } from './card/cardViewModel';
import { useCardViewModel } from './card/useCardViewModel';

interface Props {
  product: Product;
  manName: string;
}

function ProductCardImpl({ product, manName }: Props) {
  const [favorite, setFavorite] = useState(false);
  const vm = useCardViewModel(product, manName);

  const toggleFavorite = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorite((v) => !v);
  };

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
