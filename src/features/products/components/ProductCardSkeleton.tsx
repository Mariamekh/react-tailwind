export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-card border border-surface-border bg-white p-4 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="aspect-[4/3] w-full rounded-lg bg-surface-muted md:aspect-auto md:h-[140px] md:w-[182px]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-2/3 rounded bg-surface-muted" />
          <div className="h-3 w-1/2 rounded bg-surface-muted" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 rounded bg-surface-muted" />
            <div className="h-3 rounded bg-surface-muted" />
            <div className="h-3 rounded bg-surface-muted" />
            <div className="h-3 rounded bg-surface-muted" />
          </div>
          <div className="flex justify-end">
            <div className="h-6 w-28 rounded bg-surface-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
