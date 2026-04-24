export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-card border border-surface-border bg-white p-3 shadow-card md:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="aspect-[4/3] w-full rounded-lg bg-surface-muted md:h-[150px] md:w-[220px] md:aspect-auto" />
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
