import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { useProducts } from '../hooks/useProducts';
import { cn } from '@/lib/cn';

export function Pagination() {
  const page = useFiltersStore((s) => s.page);
  const setPage = useFiltersStore((s) => s.setPage);
  const { data } = useProducts();
  const pages = data?.meta.last_page ?? 1;

  if (pages <= 1) return null;

  const items = buildPageRange(page, pages);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1">
      <PageButton disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="previous">
        ‹
      </PageButton>
      {items.map((it, i) =>
        it === 'gap' ? (
          <span key={`gap-${i}`} className="px-2 text-ink-500">
            …
          </span>
        ) : (
          <PageButton key={it} active={it === page} onClick={() => setPage(it)}>
            {it}
          </PageButton>
        ),
      )}
      <PageButton disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="next">
        ›
      </PageButton>
    </nav>
  );
}

function PageButton({
  active,
  disabled,
  onClick,
  children,
  ...rest
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-9 min-w-9 rounded-md px-3 text-[14px] transition-colors',
        active
          ? 'bg-brand-orange text-white'
          : 'bg-white text-ink-900 hover:bg-surface-muted disabled:opacity-40 disabled:hover:bg-white',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function buildPageRange(current: number, total: number): Array<number | 'gap'> {
  const delta = 1;
  const range: Array<number | 'gap'> = [];
  const rangeWithGaps: Array<number | 'gap'> = [];

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  let prev: number | 'gap' | undefined;
  for (const i of range) {
    if (typeof prev === 'number' && typeof i === 'number' && i - prev > 1) {
      rangeWithGaps.push('gap');
    }
    rangeWithGaps.push(i);
    prev = i;
  }

  return rangeWithGaps;
}
