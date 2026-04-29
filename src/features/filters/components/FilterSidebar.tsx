import { VehicleTypeTabs } from './VehicleTypeTabs';
import { DealTypeSelect } from './DealTypeSelect';
import { ManufacturerFilter } from './ManufacturerFilter';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { SearchButton } from './SearchButton';

export function FilterSidebar() {
  return (
    <aside className="sticky top-6 flex h-[520px] w-[250px] shrink-0 flex-col overflow-hidden rounded-t-[12px] border border-surface-border bg-white shadow-[0px_4px_16px_0px_#A4AEC11A]">
      <VehicleTypeTabs />

      <div className="space-y-5 px-6 pb-6 pt-[22px]">
        <DealTypeSelect />
        <ManufacturerFilter />
        <CategoryFilter />
      </div>

      <div className="h-[96px] border-t border-surface-border px-6 py-4">
        <PriceFilter />
      </div>

      <div className="mt-auto px-[23px] pb-5 pt-4 shadow-[0_2px_16px_0_#272A3721]">
        <SearchButton className="h-8 gap-1 rounded-md font-sailec text-[14px] font-bold leading-[14px]" />
      </div>
    </aside>
  );
}
