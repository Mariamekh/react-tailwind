import { useFiltersStore } from '@/features/filters/store/useFiltersStore';
import { BreadcrumbChevronIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';

export function Breadcrumbs() {
  const dealType = useFiltersStore((s) => s.dealType);
  const dealLabel = dealType === 1 ? t.filters.forRent : t.filters.forSale;

  return (
    <nav className="flex items-center gap-1 font-helvetica text-[12px] font-normal leading-none">
      <a href="#" className="text-ink-600 hover:text-ink-900">
        {t.common.home}
      </a>
      <Chevron />
      <a href="#" className="text-ink-600 hover:text-ink-900">
        {t.common.search}
      </a>
      <Chevron />
      <span className="text-brand-orange">{dealLabel}</span>
    </nav>
  );
}

function Chevron() {
  return <BreadcrumbChevronIcon aria-hidden className="h-4 w-[11px] shrink-0 text-ink-600" />;
}
