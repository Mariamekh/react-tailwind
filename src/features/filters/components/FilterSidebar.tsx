import { Button } from '@/shared/ui/Button';
import { VehicleTypeTabs } from './VehicleTypeTabs';
import { DealTypeSelect } from './DealTypeSelect';
import { ManufacturerFilter } from './ManufacturerFilter';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { useFiltersStore } from '../store/useFiltersStore';
import { useProducts } from '@/features/products/hooks/useProducts';
import { formatNumber } from '@/lib/format';

export function FilterSidebar() {
  const applyDraft = useFiltersStore((s) => s.applyDraft);
  const { data, isFetching } = useProducts();
  const total = data?.meta.total ?? 0;

  return (
    <aside className="sticky top-6 flex w-[250px] min-h-[520px] shrink-0 flex-col overflow-hidden rounded-t-[12px] border border-surface-border bg-white">
      <VehicleTypeTabs />

      <div className="space-y-5 px-6 pb-5 pt-6">
        <DealTypeSelect />
        <ManufacturerFilter />
        <CategoryFilter />
      </div>

      <div className="border-t border-surface-border px-6 pb-11 pt-[19px]">
        <PriceFilter />
      </div>

      <div className="mt-auto px-[23px] pb-5 pt-4 shadow-[0_2px_16px_0_#272A3721]">
        <Button
          fullWidth
          onClick={applyDraft}
          disabled={isFetching}
          className="h-auto rounded-lg py-[9px] font-sailec text-[14px] font-bold leading-none"
        >
          ძებნა {formatNumber(total)}
        </Button>
      </div>
    </aside>
  );
}
