import { useEffect } from 'react';
import { cn } from '@/lib/cn';
import { CloseIcon } from '@/shared/icons';
import { VehicleTypeTabs } from './VehicleTypeTabs';
import { DealTypeSelect } from './DealTypeSelect';
import { ManufacturerFilter } from './ManufacturerFilter';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { Button } from '@/shared/ui/Button';
import { useFiltersStore } from '../store/useFiltersStore';
import { useProducts } from '@/features/products/hooks/useProducts';
import { formatNumber } from '@/lib/format';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileFilterDrawer({ open, onClose }: Props) {
  const applyDraft = useFiltersStore((s) => s.applyDraft);
  const { data, isFetching } = useProducts();
  const total = data?.meta.total ?? 0;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 min-[1099px]:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-ink/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
          <span className="text-[16px] font-semibold">ფილტრი</span>
          <button onClick={onClose} aria-label="close">
            <CloseIcon className="h-5 w-5 text-ink-900" />
          </button>
        </div>
        <div className="scrollbar-thin flex-1 space-y-4 overflow-auto px-4 py-4">
          <VehicleTypeTabs />
          <DealTypeSelect />
          <ManufacturerFilter />
          <CategoryFilter />
          <PriceFilter />
        </div>
        <div className="shrink-0 border-t border-surface-border p-4">
          <Button
            fullWidth
            size="lg"
            onClick={() => {
              applyDraft();
              onClose();
            }}
            disabled={isFetching}
          >
            ძებნა {formatNumber(total)}
          </Button>
        </div>
      </div>
    </div>
  );
}
