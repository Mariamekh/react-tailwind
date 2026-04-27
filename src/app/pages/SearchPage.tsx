import { useState } from "react";
import { FilterSidebar } from "@/features/filters/components/FilterSidebar";
import { ProductList } from "@/features/products/components/ProductList";
import { ResultsToolbar } from "@/features/products/components/ResultsToolbar";
import { Pagination } from "@/features/products/components/Pagination";
import { Breadcrumbs } from "@/shared/layout/Breadcrumbs";
import { MobileFilterDrawer } from "@/features/filters/components/MobileFilterDrawer";
import { MobileFilterChips } from "@/features/filters/components/MobileFilterChips";

export function SearchPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1098px] pb-12 md:pb-16">
      <div className="hidden px-4 md:block md:px-6">
        <div className="mx-auto max-w-[780px] pt-[32px] min-[1099px]:max-w-none">
          <Breadcrumbs />
        </div>
      </div>

      <div className="px-4 py-4 md:px-6 min-[1099px]:hidden">
        <div className="mx-auto max-w-[780px]">
          <MobileFilterChips onOpenFilters={() => setMobileOpen(true)} />
        </div>
      </div>

      <div className="bg-white px-4 md:bg-transparent md:px-6">
        <div className="flex justify-center gap-5 md:mt-[20px]">
          <div className="hidden min-[1099px]:block">
            <FilterSidebar />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mx-auto max-w-[780px] min-[1099px]:mx-0">
              <div className="hidden md:block">
                <ResultsToolbar onOpenFilters={() => setMobileOpen(true)} />
              </div>
              <div className="-mx-4 md:mx-0 md:mt-4">
                <ProductList />
              </div>
              <div className="mt-6">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </div>
  );
}
