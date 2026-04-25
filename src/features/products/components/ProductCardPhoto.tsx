import { useMemo, useState, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';
import { GalleryIcon } from '@/shared/icons';
import {
  getPhotoCount,
  getProductPhoto,
  hasPhoto as hasPhotoForProduct,
} from '../lib/photoUrl';
import type { Product } from '../types';

const MAX_SLICES = 4;

interface Props {
  product: Product;
  title: string;
  className?: string;
  topLeftContent?: React.ReactNode;
  topRightContent?: React.ReactNode;
}

export function ProductCardPhoto({
  product,
  title,
  className,
  topLeftContent,
  topRightContent,
}: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [erroredIndices, setErroredIndices] = useState<Record<number, boolean>>({});

  const totalPhotos = getPhotoCount(product);
  const slices = Math.min(Math.max(totalPhotos, 1), MAX_SLICES);
  const extraPhotos = Math.max(0, totalPhotos - slices);

  const activeIndex = hoverIndex ?? 0;
  const hovering = hoverIndex !== null;

  const resolvedIndex = useMemo(() => {
    for (let step = 0; step < slices; step++) {
      const tryIdx = (activeIndex + step) % slices;
      if (!erroredIndices[tryIdx]) return tryIdx;
    }
    return activeIndex;
  }, [activeIndex, slices, erroredIndices]);

  if (!hasPhotoForProduct(product)) {
    return (
      <Frame className={className}>
        <div className="flex h-full w-full items-center justify-center text-xs text-ink-muted">
          no photo
        </div>
        {topLeftContent && <div className="absolute left-2 top-2">{topLeftContent}</div>}
        {topRightContent && <div className="absolute right-2 top-2">{topRightContent}</div>}
      </Frame>
    );
  }

  const photoUrl = getProductPhoto(product, { index: resolvedIndex + 1 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (slices <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const idx = Math.min(slices - 1, Math.floor((x / rect.width) * slices));
    setHoverIndex(idx);
  };

  return (
    <Frame
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={(e) => handleMove(e as MouseEvent<HTMLDivElement>)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <img
        key={resolvedIndex}
        src={photoUrl}
        alt={title}
        loading="lazy"
        onError={() =>
          setErroredIndices((m) => ({ ...m, [resolvedIndex]: true }))
        }
        className="h-full w-full object-cover"
      />

      {hovering && extraPhotos > 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ink/40 text-white">
          <GalleryIcon className="h-8 w-8" />
          <span className="mt-2 text-[22px] font-semibold leading-none">
            +{extraPhotos} <span className="font-normal">ფოტო</span>
          </span>
        </div>
      )}

      {slices > 1 && hovering && (
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex gap-1">
          {Array.from({ length: slices }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-[3px] flex-1 rounded-full',
                i === activeIndex ? 'bg-brand-orange' : 'bg-white/55',
              )}
            />
          ))}
        </div>
      )}

      {topLeftContent && (
        <div className="pointer-events-none absolute left-2 top-2">{topLeftContent}</div>
      )}
      {topRightContent && <div className="absolute right-2 top-2">{topRightContent}</div>}
    </Frame>
  );
}

function Frame({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'relative aspect-[4/3] w-full shrink-0 cursor-pointer overflow-hidden rounded-lg bg-surface-muted md:aspect-auto md:h-[150px] md:w-[220px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
