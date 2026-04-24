import { useState } from 'react';
import { FilterSidebar } from '@/features/filters/components/FilterSidebar';
import { ProductList } from '@/features/products/components/ProductList';
import { ResultsToolbar } from '@/features/products/components/ResultsToolbar';
import { Breadcrumbs } from '@/shared/layout/Breadcrumbs';
import { MobileFilterDrawer } from '@/features/filters/components/MobileFilterDrawer';
import { FilterIcon } from '@/shared/icons';

export function SearchPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-4 md:px-6 md:py-5">
      <Breadcrumbs />
      <div className="mt-4 flex gap-5 md:mt-5">
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        <div className="min-w-0 flex-1">
          <ResultsToolbar onOpenFilters={() => setMobileOpen(true)} />
          <div className="mt-3 md:mt-4">
            <ProductList />
          </div>
        </div>
      </div>

      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-5 right-5 z-20 flex h-12 items-center gap-2 rounded-full bg-brand-orange px-5 text-[14px] font-semibold text-white shadow-lg md:hidden"
      >
        <FilterIcon className="h-5 w-5" />
        ფილტრი
      </button>

      <MobileFilterDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
