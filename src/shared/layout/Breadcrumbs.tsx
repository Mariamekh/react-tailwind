import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { BreadcrumbChevronIcon } from '@/shared/icons';

export function Breadcrumbs() {
  const dealType = useFiltersStore((s) => s.dealType);
  const dealLabel = dealType === 1 ? 'ქირავდება' : 'იყიდება';

  return (
    <nav className="flex items-center gap-1 text-[12px] leading-none">
      <a href="#" className="text-ink-soft hover:text-ink">
        მთავარი
      </a>
      <Chevron />
      <a href="#" className="text-ink-soft hover:text-ink">
        ძიება
      </a>
      <Chevron />
      <span className="text-brand-orange">{dealLabel}</span>
    </nav>
  );
}

function Chevron() {
  return (
    <BreadcrumbChevronIcon
      aria-hidden
      className="h-4 w-[11px] shrink-0 text-ink-soft"
    />
  );
}
