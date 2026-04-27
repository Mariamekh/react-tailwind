import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { cn } from '@/lib/cn';

export function ProductList() {
  const { data, isLoading, isFetching, isError, refetch } = useProducts();
  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div className="space-y-2 md:space-y-[10px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-card border border-surface-border bg-white p-8 text-center">
        <p className="text-ink-900">ვერ მოხერხდა მონაცემების ჩატვირთვა</p>
        <button
          onClick={() => refetch()}
          className="mt-3 text-[14px] font-medium text-brand-orange hover:underline"
        >
          ხელახლა ცდა
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-card border border-surface-border bg-white p-10 text-center text-ink-500">
        მითითებული პარამეტრებით ავტომობილი ვერ მოიძებნა
      </div>
    );
  }

  return (
    <div
      aria-busy={isFetching}
      className={cn(
        'space-y-2 md:space-y-[10px] transition-opacity duration-200',
        isFetching && 'opacity-50',
      )}
    >
      {items.map((p) => (
        <ProductCard key={p.car_id} product={p} />
      ))}
    </div>
  );
}
